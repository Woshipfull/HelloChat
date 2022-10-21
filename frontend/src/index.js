/* eslint-disable comma-dangle */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './i18next.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
