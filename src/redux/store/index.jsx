import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootreducer from '../reducers';

const store = createStore(rootreducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
