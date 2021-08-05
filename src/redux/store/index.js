import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ComposedWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  ComposedWithDevTools(applyMiddleware(thunk)),
);

export default store;

if (window.Cypress) {
  window.store = store;
}
