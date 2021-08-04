import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';

export default combineReducers({
  login,
  questions,
});
