import { combineReducers } from 'redux';
import player from './login';
import API from './questions';

export default combineReducers({
  player,
  API,
});
