import { combineReducers } from 'redux';
import user from './userReducer';
import fetchReducers from './fetchReducers';
import getSeconds from './getSeconds';

const rootReducer = combineReducers({
  user,
  fetchReducers,
  getSeconds,
});

export default rootReducer;
