import fs from 'fs';

import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import compression from 'compression';
import { WrappedMain } from './App';
import { Provider } from 'react-redux';
import { ac_saveContent, ac_saveProfile, store } from '@store';
import { renderToString } from 'react-dom/server';
import { document, window } from 'ssr-window';
import { getContentRequest, getProfileRequest } from '@utils/services';
import { routesConfig } from '@domain';

const PORT = process.env.PORT || 4201;
const app = express();
const indexFile = 'server.html';

app.use(compression());

app.use(express.static('./'));

app.get('*', (req: express.Request, res: express.Response) => {
	const url = '/' + req.url.replace(/^\/?([^\/]*)\/?.*/, '$1');
	const requestedRoute = routesConfig.find((el) => el.path === url);
	if (!requestedRoute) {
		console.error('cant find content for route', req.url);
		return fs.readFile(indexFile, 'utf8', async (err, data) => {
			if (err) {
				console.error('Something went wrong:', err);
				return res.status(500).send('Oops, better luck next time!');
			}
			return res.send(data);
		});
	}
	(global as any).window = window;
	(global as any).document = document;
	(global as any).location = window.location;
	return Promise.all([
		new Promise((resolve, reject) => {
			getContentRequest(url)
				.then((e) => resolve(e))
				.catch((e) => {
					reject(e);
					console.log(e);
				});
		}),
		new Promise((resolve, reject) => {
			getProfileRequest()
				.then((e) => resolve(e))
				.catch((e) => {
					resolve(null);
					if (e.response.status !== 403) {
						console.error(e.response);
					}
				});
		}),
	]).then(([content, profile]: any) => {
		store.dispatch(ac_saveContent({ [url.slice(1)]: content }));
		store.dispatch(ac_saveProfile(profile));
		const context = {};
		const app = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<WrappedMain />
				</StaticRouter>
			</Provider>,
		);
		return fs.readFile(indexFile, 'utf8', async (err, data) => {
			if (err) {
				console.error('Something went wrong:', err);
				return res.status(500).send('Oops, better luck next time!');
			}
			const preloadedState = store.getState();
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
