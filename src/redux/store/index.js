import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const extension = window.devToolsExtension() || ((f) => f);
const store = createStore(rootReducer, compose(applyMiddleware(thunk), extension));

if (window.Cypress) {
  window.store = store;
}

export default store;
