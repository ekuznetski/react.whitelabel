import './i18n'; // Must be the imported before the App!
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'core-js/stable';
import 'react-hot-loader';
import 'regenerator-runtime/runtime';
import 'react-day-picker/lib/style.css';
import { WindowProps } from '@domain/interfaces';
import { env } from '@env';
import App from './App';

declare global {
  interface Window extends WindowProps {}
}

ReactDOM[env.PRODUCTION ? 'hydrate' : 'render'](
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
