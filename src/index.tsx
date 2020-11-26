import './i18n'; // Must be the imported before the App!
import 'core-js/stable';
import React from 'react';
import 'react-day-picker/lib/style.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import TagManager from 'react-gtm-module';
import App from './App';
import { env } from '@domain';

const isProduction = process.env.PRODUCTION;
if (env.GTM_ID) {
  TagManager.initialize({
    gtmId: env.GTM_ID,
  });
}

ReactDOM[isProduction ? 'hydrate' : 'render'](
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
