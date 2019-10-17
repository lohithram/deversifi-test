import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from 'store/configureStore';

import './index.css';

declare global
{  interface Window {
    apps: any
  }
}

const APP_NAME = "product"

const store = configureStore();

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
);




const renderApp = () => {
  ReactDOM.render(app, document.getElementById(`${APP_NAME}-root`));
}

if( window.apps ) {
  window.apps[APP_NAME] = renderApp;
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
