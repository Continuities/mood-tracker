import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App.js';

(async () => {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service worker registered', reg);
  }
})();

ReactDOM.render(<App />, document.getElementById('app'));