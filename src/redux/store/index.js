import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ComposedWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, ComposedWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

export default store;
