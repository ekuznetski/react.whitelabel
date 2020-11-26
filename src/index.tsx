import './i18n'; // Must be the imported before the App!
import 'core-js/stable';
import React from 'react';
import 'react-day-picker/lib/style.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import App from './App';

const isProduction = process.env.PRODUCTION;

ReactDOM[isProduction ? 'hydrate' : 'render'](
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
