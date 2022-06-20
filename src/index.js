import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GlobalProvider from './contex/GlobalProvider';

ReactDOM.render(
  <BrowserRouter>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </BrowserRouter>, document.getElementById('root'),
);

serviceWorker.unregister();
