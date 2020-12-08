import './i18n'; // Must be the imported before the App!
import { Footer, Header, Router } from '@components/core';
import { routesNavConfig } from '@domain';
import { EAppSection, ELanguage } from '@domain/enums';
import { store } from '@store';
import { routeFetchData } from '@utils/fn';
import compression from 'compression';
import 'core-js/stable';
import express from 'express';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { document, window } from 'ssr-window';
import path from 'path';
import './App.scss';

let requestResolver: { (): void; (value?: unknown): void } | null = null;
const PORT = process.env.PORT || 4201;
const app = express();
const indexFile = path.normalize('browser/server.html');
const unsubscribeRequestResolver = store.subscribe(() => {
		const storeState = store.getState();

		if (storeState.app.requests.activeList.length == 0 && requestResolver) {
				requestResolver();
		}
});

app.use(compression());
app.use(express.static('./browser'));
app.use(express.static('./assets'));

app.get('*', (req: express.Request, res: express.Response) => {
		(global as any).window = window;
		(global as any).document = document;
		(global as any).location = window.location;

		const fileExist = fs.existsSync(indexFile);
		let url = req.url;

		const urlArr = url.split('/');
		if (urlArr.length >= 1 && Object.keys(ELanguage).includes(urlArr[1])) {
				url = url.replace(`/${ELanguage[urlArr[1] as keyof typeof ELanguage]}`, '');
		}

		const route = routesNavConfig.find((el) => el.path === url);
		if (!route || !fileExist) {
				if (!route) console.error('Cant find content for route', req.url, '[', url, ']');
				if (!fileExist) console.error('Server.html not found');

				// unsubscribeRequestResolver();
				return res.status(500).send('Oops, better luck next time!');
		}

		return new Promise((resolve) => {
				requestResolver = resolve;
				routeFetchData(route);
		}).then(() => {
				const app = renderToString(
						<StaticRouter location={url}>
								<Provider store={store}>
										<div className="main-wrapper">
												<Header />
												<main className="router-context">
														{route.appSection === EAppSection.portal ? null : route.component && <route.component />}
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
								data.replace(
										'<div id="root"></div>',
										`<div id="root">${app}</div><script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(
												/</g,
												'\\u003c',
										)}</script>`,
								),
						);
				});
		});
});

app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
});
