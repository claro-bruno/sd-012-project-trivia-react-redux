import React from 'react';
import ReactDOM from 'react-dom';
import { BrowseRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowseRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowseRouter>,
  document.getElementById('root'),
);
serviceWorker.unregister();
