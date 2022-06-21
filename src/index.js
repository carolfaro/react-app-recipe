import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GlobalProvider from './contex/GlobalProvider';

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>, document.getElementById('root'),
);

serviceWorker.unregister();
