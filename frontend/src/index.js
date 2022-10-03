/* eslint-disable comma-dangle */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { BrowserRouter } from 'react-router-dom';

import './i18next.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>
);
