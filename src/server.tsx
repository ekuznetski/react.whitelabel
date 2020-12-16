import './i18n'; // Must be the imported before the App!
import { Footer, Header, NotFound } from '@components/core';
import { localesConfig } from '@domain';
import { EAppSection, ELanguage } from '@domain/enums';
import { IRouteNavConfig } from '@domain/interfaces';
import { routesInitialApiData, routesNavConfig } from '@routers';
import { ac_updateRouteParams, store } from '@store';
import { routeFetchData } from '@utils/fn';
import compression from 'compression';
import 'core-js/stable';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { document, window } from 'ssr-window';
import { env } from '@env';
import './App.scss';

let requestResolver: { (): void; (value?: unknown): void } | null = null;
let route: IRouteNavConfig | null = null;

const PORT = process.env.PORT || 4201;
const app = express();
const indexFile = path.normalize('browser/server.html');
const unsubscribeRequestResolver = store.subscribe(() => {
  const storeState = store.getState();

  if (route) {
    const _routeStrictRequests = [
      ...(route.apiData?.strict || []),
      ...(routesInitialApiData[route.appSection]?.strict || []),
    ].map((action) => action().type);
    const hasUncompletedStrictRequest = _routeStrictRequests.length
      ? storeState.app.requests.activeList.filter((request) => _routeStrictRequests.includes(request)).length > 0
      : false;

    if (!hasUncompletedStrictRequest && storeState.app.route.appSection && requestResolver) {
      requestResolver();
    }
  }
});

app.use(compression());
app.use(express.static('./browser'));
app.use(express.static('./assets'));

app.get('*', (req: express.Request, res: express.Response) => {
  (global as any).window = window;
  (global as any).document = document;
  (global as any).location = window.location;
  (global as any).localStorage = null;
  (global as any).window['isSSR'] = true;

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

  return new Promise((resolve) => {
    requestResolver = resolve;
    if (route) {
      store.dispatch(
        ac_updateRouteParams({
          path: route?.path,
          appSection: route?.appSection,
          meta: route?.meta,
          state: route?.state,
          isLoading: false,
        }),
      );
      routeFetchData(route);
    } else {
      store.dispatch(
        ac_updateRouteParams({
          path: '404',
          appSection: EAppSection.main,
          isLoading: false,
        }),
      );
      requestResolver();
    }
  }).then(() => {
    const app = renderToString(
      <StaticRouter location={page}>
        <Provider store={store}>
          <div className="main-wrapper">
            <Header />
            <main className="router-context">
              {route ? (
                route.appSection === EAppSection.portal ? null : (
                  route.component && <route.component />
                )
              ) : (
                <NotFound />
              )}
            </main>
          </div>
          <Footer />
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
      preloadedState.app.route.isLoading = false;

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
            '<title>WhiteLabel</title>',
            `<title>${route?.meta.title}</title><meta name="description" content="${route?.meta.desc}"><meta property="og:type" content="website"><meta property="og:title" content="${route?.meta.title}"><meta property="og:description" content="${route?.meta.desc}"><meta property="og:image" content="${env.SITE_URL}/assets/og-img.png"><meta property="og:url" content="${env.SITE_URL}"><meta name="twitter:card" content="summary_large_image">`,
          ),
      );
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
