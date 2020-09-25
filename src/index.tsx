// import './i18n';
import 'core-js/stable';
import 'react-day-picker/lib/style.css';
import React from 'react';
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
