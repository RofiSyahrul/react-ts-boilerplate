/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

ReactDOM.render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator && !__DEV__) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service worker registered');
      })
      .catch(() => {
        console.log('Service worker registration failed');
      });
  });
}
