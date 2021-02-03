import './i18n'; // Must be the imported before the App!
import { Footer, Header, NotFound, PageLoader } from '@components/core';
import { localesConfig } from '@domain';
import { EAppSection, ELanguage, EPagePath } from '@domain/enums';
import { AnyFunction, IRouteNavConfig } from '@domain/interfaces';
import { env } from '@env';
import { routesInitialApiData, routesNavConfig } from '@routers';
import { IStore, ac_clearStore, ac_updateRouteParams, store } from '@store';
import { routeFetchData } from '@utils/fn/routeFetchData';
import axios, { Method } from 'axios';
import compression from 'compression';
import 'core-js/stable';
import express from 'express';
import fs from 'fs';
import path from 'path';
import qs from 'qs';
import redis from 'redis';
import cors from 'cors';
import nocache from 'nocache';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { document, window } from 'ssr-window';
import './App.scss';

declare module 'express-session' {
  interface SessionData {
    CakePHPCookie: string;
  }
}

let requestResolver: AnyFunction = null;
let route: IRouteNavConfig | null = null;

const REDIS_PORT = 6379;
const PORT = process.env.PORT || 4201;
const app = express();
const indexFile = path.normalize('browser/server.html');

const allowedOriginDevList = ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:4201', 'http://127.0.0.1:3000', 'https://www.bluesquarefx.com'];
const allowedOriginLabelList = new RegExp(/(bluesquarefx.com)/);
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
};

let storeState: IStore;
const unsubscribeRequestResolver = store.subscribe(() => {
  const prevStoreState = storeState;
  storeState = store.getState();

  if (route) {
    const _routeStrictRequests = [
      ...(route.apiData?.strict || []),
      ...(routesInitialApiData[route.appSection]?.strict || []),
    ]
      .map((action) => action().type)
      .filter((action) => !!action);

    const prevActiveList = prevStoreState?.app?.requests?.activeList || [],
      activeList = storeState.app.requests.activeList;

    const hasUncompletedStrictRequest = _routeStrictRequests.length
      ? prevActiveList.length
        ? prevActiveList.join('') !== activeList.join('')
          ? prevActiveList.filter((request) => _routeStrictRequests.includes(request)).length > 0 &&
            activeList.length != 0
          : true
        : true
      : false;

    if (!hasUncompletedStrictRequest && storeState.app.route.appSection && requestResolver) {
      console.log('========data ready========');
      requestResolver();
    }
  }
});

const RedisStore = require('connect-redis')(session);
const RedisClient = redis.createClient(REDIS_PORT);
const sessionOptions: session.SessionOptions = {
  genid: () => uuidv4(),
  secret: '$2y$12$2pMm6FzrD/Vu7lN/sBw07.MKzcc7LLkGyf4maPWV/8JokAJFDoCVO', // LW_wNc+G2x#Erc;C
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({ client: RedisClient, ttl: 18000 }), // 5hours to expire the session should be same as CAKEPHP cookie expire timeout
};

RedisClient.on('error', function (err) {
  console.log('Redis error: ' + err);
});

RedisClient.on('ready', function () {
  console.log('Redis is ready');
});

function checkAuthenticationCookie(req: express.Request, resp: express.Response, next: express.NextFunction) {
  const reqHeaderCookie = req.cookies?.CAKEPHP && `CAKEPHP=${req.cookies.CAKEPHP}`;
  const reqSessionCookie = req.session?.CakePHPCookie;

  if (req.originalUrl.indexOf('/proxy') === 0) {
    if (req.url.includes('/logout')) {
      req.session.destroy(function () {
        if (req.session) req.session.CakePHPCookie = undefined;
        console.log('User logged out: /logout has been called');
      });
    }
  } else {
    if (!reqHeaderCookie) {
      req.session.destroy(function () {
        console.log('User logged out: CAKEPHP cookie not found');
      });
    }
  }

  next();
}

app.set('trust proxy', true);
app.use(nocache());
app.use(compression());
app.use(express.static('./browser'));
app.use(express.static('./assets'));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors(corsOptions));

app.use('/proxy', checkAuthenticationCookie, (req, resp) => {
  const reqHeaderCookie = req.cookies?.CAKEPHP && `CAKEPHP=${req.cookies.CAKEPHP}`;
  const reqSessionCookie = req.session?.CakePHPCookie;
  const authenticationToken = reqHeaderCookie || reqSessionCookie;
  const xRealIP = Array.from(req.headers?.['x-forwarded-for'] || '').flat()[0];

  const options = {
    headers: Object.assign(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      xRealIP && { 'X-Real-IP': xRealIP },
      authenticationToken && { Cookie: authenticationToken },
    ),
    withCredentials: true,
    method: req.method as Method,
    data: qs.stringify(req.body),
  };

  axios(`${env.API_URL}${req.url}`, options)
    .then((res: any) => {
      if ((res.data?.status || res.data?.response?.status) === 'failure') {
        console.log(`failure ${req.method} - ${req.url}: ${res.data}`);
      } else {
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
        req.session.CakePHPCookie = _cakePHP;
      }

      if (res.headers) {
        // res.headers['Cache-Control'] = "no-cache='Set-Cookie, Set-Cookie2'";

        if (res.headers['transfer-encoding']) delete res.headers['transfer-encoding'];
      }

      resp.set(res.headers);
      return resp.status(res.status).send(res.data);
    })
    .catch((err) => {
      const statusCode = !!err.response ? err.response.status : 500;
      console.log(`catch ${req.method} - ${req.url}: ${err}`);
      return resp.status(statusCode).send(err);
    });
});

app.get('*', checkAuthenticationCookie, (req: express.Request, res: express.Response) => {
  (global as any).window = window;
  (global as any).document = document;
  (global as any).location = window.location;
  (global as any).localStorage = null;
  (global as any).window['isSSR'] = true;
  (global as any).window['CakePHPCookie'] = req.session?.CakePHPCookie || '';

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
    // unsubscribeRequestResolver();
    return res.status(500).send('Oops, better luck next time!');
  }

  store.dispatch(ac_clearStore());

  return new Promise((resolve) => {
    requestResolver = resolve;
    if (route) {
      store.dispatch(
        ac_updateRouteParams({
          path: route?.path,
          appSection: route?.appSection,
          meta: route?.meta,
          state: route?.state,
          isLoading: true,
        }),
      );
      console.log('========request data========');
      routeFetchData(route);
    } else {
      store.dispatch(
        ac_updateRouteParams({
          path: EPagePath.NotFound,
          appSection: EAppSection.general,
          isLoading: true,
        }),
      );
      requestResolver();
    }
  }).then(() => {
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
                <Footer />{' '}
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

        unsubscribeRequestResolver();
        return res.status(500).send('Oops, better luck next time!');
      }
      const preloadedState = store.getState();
      preloadedState.app.requests.activeList = [];

      return res.send(
        data
          .replace(
            '<div id="root"></div>',
            `<div id="root" class="${
              route?.appSection
            }">${app}</div><script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c',
            )}</script>`,
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
