import './i18n'; // Must be the imported before the App!
import { Footer, Header, NotFound, PageLoader } from '@components/core';
import { localesConfig } from '@domain';
import { EAppSection, ELanguage } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import { env } from '@env';
import { routesInitialApiData, routesNavConfig } from '@routers';
import { store } from '@store';
import { Request as APIRequest } from '@utils/services';
import axios, { Method } from 'axios';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import 'core-js/stable';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import FormData from 'form-data';
import fs from 'fs';
import multer from 'multer';
import nocache from 'nocache';
import path from 'path';
import qs from 'qs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import redis from 'redis';
import requestIp from 'request-ip';
import { document, window } from 'ssr-window';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';

declare module 'express-session' {
  interface SessionData {
    CakePHPCookie: string;
    activeRequests: string[];
  }
}

let route: IRouteNavConfig | null = null;

const REDIS_PORT = 6379;
const SESSION_COOKIE_NAME = '__cresid';
const PORT = process.env.PORT || 4201;
const DATA_LIMIT = 335 * 1024 * 1024; // 35bm
const app = express();
const upload = multer({ dest: '/tmp/uploads', limits: { fieldNameSize: 1024, fieldSize: 1024 * 1024 * 15 } });
const indexFile = path.normalize('browser/server.html');

const allowedUploadURLs = ['/v2/documents/upload'];
const allowedOriginDevList = ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:4201'];
const allowedOriginLabelList = new RegExp(/(bluesquarefx.com|uinvex.com)/);
const corsOptions: cors.CorsOptions = {
  origin: function (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!requestOrigin || allowedOriginDevList.includes(requestOrigin) || allowedOriginLabelList.test(requestOrigin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin: ' + requestOrigin;
      console.error(msg);
      return callback(new Error(msg), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

const RedisStore = require('connect-redis')(session);
const RedisClient = redis.createClient(REDIS_PORT, env.DEV_MODE ? '127.0.0.1' : 'redis');
const sessionOptions: session.SessionOptions = {
  genid: () => uuidv4(),
  secret: '$2y$12$2pMm6FzrD/Vu7lN/sBw07.MKzcc7LLkGyf4maPWV/8JokAJFDoCVO', // LW_wNc+G2x#Erc;C
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: RedisClient }),
  name: SESSION_COOKIE_NAME,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: false, // if true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 60 * 5, // 5h, should be the same as CAKEPHP cookie expire timeout
  },
};

RedisClient.on('error', function (err) {
  console.log('Redis error: ' + err);
});

RedisClient.on('ready', function () {
  console.log('Redis is ready');
});

function addUrlToActiveRequestsList(req: express.Request) {
  if (req.session && req.session.CakePHPCookie && req.session.activeRequests) {
    req.session.activeRequests.push(req.url);
  }
}

function removeUrlToActiveRequestsList(req: express.Request) {
  if (req.session && req.session.CakePHPCookie && req.session.activeRequests) {
    const _idx = req.session.activeRequests.indexOf(req.url);
    req.session.activeRequests.splice(_idx, 1);
  }
}

function checkAuthenticationCookie(req: express.Request, res: express.Response, next: express.NextFunction) {
  const reqHeaderCookie = req.cookies?.CAKEPHP && `CAKEPHP=${req.cookies.CAKEPHP}`;

  if (reqHeaderCookie && !req.session.CakePHPCookie) {
    req.session.regenerate(function () {
      req.session.CakePHPCookie = reqHeaderCookie;
      req.session.activeRequests = [];
    });
    console.log('Session recovered from CAKEPHP cookie');
  } else if (!reqHeaderCookie && !req.cookies[SESSION_COOKIE_NAME] && req.session.CakePHPCookie) {
    req.session.destroy(function () {
      console.log('User logged out: CAKEPHP cookie not found');
    });
  }

  if (req.originalUrl.indexOf('/proxy') === 0) {
    if (req.url.includes('/logout')) {
      req.session.destroy(function () {
        console.log('Session destroyed: /logout has been called');
      });
    }
  }

  next();
}

function declareSSRProps(req: express.Request, resp: express.Response, next: express.NextFunction) {
  (global as any).window = window;
  (global as any).document = document;
  (global as any).location = window.location;
  (global as any).localStorage = null;
  (global as any).window['isSSR'] = true;

  next();
}

function declareProxyProps(req: express.Request, resp: express.Response, next: express.NextFunction) {
  addUrlToActiveRequestsList(req);

  next();
}

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: DATA_LIMIT })); // for parsing application/x-www-form-urlencoded
app.set('trust proxy', true);
app.use(requestIp.mw());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session(sessionOptions));

app.use('/proxy', nocache(), checkAuthenticationCookie, declareProxyProps, upload.any(), (req, resp) => {
  const _token = req.session?.CakePHPCookie;
  const xRealIP = (req.get('xrealip') || req.ip || req.ips[0] || req.clientIp)
    ?.replace('::ffff:', '')
    ?.replace('::1', '127.0.0.1:3000');

  const options = {
    headers: Object.assign(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      xRealIP && { 'HTTP-X-Real-IP': xRealIP },
      xRealIP && { 'X-Forwarded-For': xRealIP },
      _token && { Cookie: _token },
    ),
    maxContentLength: DATA_LIMIT,
    maxBodyLength: DATA_LIMIT,
    withCredentials: true,
    method: req.method as Method,
    data: qs.stringify(req.body),
  };

  if (allowedUploadURLs.includes(req.url) && Array.isArray(req.files)) {
    const _filesData = new FormData();
    req.files.forEach((file) => {
      const fileStream = fs.createReadStream(file.path);
      _filesData.append(file.fieldname, fileStream, { contentType: file.mimetype });
    });

    Object.assign(options, {
      headers: Object.assign(options.headers, _filesData.getHeaders()),
      data: _filesData,
    });
  }

  return axios(`${env.API_URL}${req.url}`, options)
    .then((res: any) => {
      if ((res.data?.status || res.data?.response?.status) === 'failure') {
        console.log(`failure ${req.method} - ${req.url}: ${res.data}`);
      } else {
        if (!(req.url.includes('/xwayz') && env.DEV_MODE))
          console.log(`success ${req.method} - ${req.url}: ${res.data}`);
      }

      if (req.url.includes('/login')) {
        let setCookie = Array.from(res.headers['set-cookie']);

        const _cakePHP = setCookie
          ? setCookie
              .join('; ')
              .split('; ')
              .filter((el: any) => el.includes('CAKEPHP'))[0]
          : '';

        if (req.hostname === 'localhost') {
          // console.log(setCookie);
          setCookie = setCookie.map((sc: any) =>
            sc
              .split('; ')
              .map((el: any) => (el.includes('domain=') ? 'domain=localhost' : el.includes('secure') ? '' : el))
              .join('; '),
          );
        }

        res.headers['set-cookie'] = setCookie;

        // Declare session params
        console.log('Session initialized');
        req.session.CakePHPCookie = _cakePHP;
        req.session.activeRequests = [];
      }

      if (req.url.includes('/logout')) {
        resp.cookie('CAKEPHP', '', { expires: new Date(Date.now() - 1000000), httpOnly: true });
        res.headers['set-cookie'].push(resp.getHeader('set-cookie'));
      }

      if (res.headers) {
        // res.headers['Cache-Control'] = "no-cache='Set-Cookie, Set-Cookie2'";

        if (res.headers['transfer-encoding']) delete res.headers['transfer-encoding'];
      }

      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file) => fs.unlink(file.path, () => {}));
      }

      removeUrlToActiveRequestsList(req);

      resp.set(res.headers);
      return resp.status(res.status).send(res.data);
    })
    .catch((err) => {
      removeUrlToActiveRequestsList(req);

      const statusCode = !!err.response ? err.response.status : 500;
      console.log(`catch ${req.method} - ${req.url}: ${err}`);
      return resp.status(statusCode).send(err);
    });
});

app.use(compression());
app.use(express.static('./browser'));
app.use(express.static('./assets'));

app.get('*', checkAuthenticationCookie, declareSSRProps, (req: express.Request, res: express.Response) => {
  const xRealIP = (req.ip || req.ips[0] || req.clientIp)?.replace('::1', '127.0.0.1:3000');
  (global as any).window['xRealIP'] = xRealIP;

  const fileExist = fs.existsSync(indexFile);
  let urlArr = req.url.replace(/(\?=?|#).*?$/, '').match(/\/?([^\/]+)?\/?(.*)?$/) || [],
    lng = !urlArr[2] && !localesConfig.includes(urlArr[1] as ELanguage) ? ELanguage.en : urlArr[1],
    page = !urlArr[2] && !localesConfig.includes(urlArr[1] as ELanguage) ? urlArr[1] : urlArr[2];

  if (!lng) lng = ELanguage.en;
  page = !page ? '' : '/' + page;

  route = routesNavConfig.find((el) => el.path === page) || null;
  if (!route) {
    console.error('Cant find content for route', req.url, '#', lng, '[', page, ']', 'redirect to 404');
  }

  if (!fileExist) {
    console.error('Server.html not found');
    return res.status(500).send('Oops, better luck next time!');
  }

  console.log('========request data========');
  const requests: Promise<any>[] = route
    ? [...(route.apiData?.strict || []), ...(routesInitialApiData[route.appSection]?.strict || [])].map((action) => {
        //@ts-ignore
        return APIRequest[action().type](`${SESSION_COOKIE_NAME}=${req.cookies[SESSION_COOKIE_NAME]}`)()
          .then((value: any) => value)
          .catch(() => null);
      })
    : [];

  return Promise.all(requests).then((preloadedData) => {
    console.log('========data ready========');
    const app = renderToString(
      <StaticRouter location={page}>
        <Provider store={store}>
          <PageLoader isLoading={true} />
          {route ? (
            route.appSection === EAppSection.portal ? null : (
              <>
                <div className="main-wrapper">
                  <Header />
                  <main className="router-context">{route.component && <route.component />}</main>
                </div>
                <Footer />
              </>
            )
          ) : (
            <NotFound />
          )}
          <div id="dynamic-portals" />
        </Provider>
      </StaticRouter>,
    );

    return fs.readFile(indexFile, 'utf8', async (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);

        return res.status(500).send('Oops, better luck next time!');
      }

      return res.send(
        data
          .replace(
            '<div id="root"></div>',
            `<div id="root" class="${
              route?.appSection
            }">${app}</div><script>window.__PRELOADED_STATE__=${JSON.stringify({
              rawData: preloadedData.filter((e) => !!e),
            }).replace(/</g, '\\u003c')}</script>`,
          )
          .replace(
            '<title></title>',
            `<title>${route?.meta.title}</title>
            <meta name="description" content="${route?.meta.desc}">
            <meta property="og:type" content="website">
            <meta property="og:title" content="${route?.meta.title}">
            <meta property="og:description" content="${route?.meta.desc}">
            <meta property="og:image" content="https://${req.headers.host}/assets/og-img.jpg">
            <meta property="og:url" content="https://${req.headers.host}">
            <meta name="twitter:card" content="summary_large_image">`,
          ),
      );
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
