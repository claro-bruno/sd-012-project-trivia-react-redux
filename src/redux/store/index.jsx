import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';

const store = createStore(() => {}, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;