import { combineReducers } from 'redux';
import login from './login';
import API from './questions';

export default combineReducers({
  login,
  API,
});
