import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { rootReducers } from './combinedReducer';

const store = createStore(rootReducers, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
