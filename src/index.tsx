import './i18n'; // Must be the imported before the App!
import { env } from '@env';
import 'core-js/stable';
import React from 'react';
import 'react-day-picker/lib/style.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import App from './App';

ReactDOM[env.PRODUCTION ? 'hydrate' : 'render'](
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
