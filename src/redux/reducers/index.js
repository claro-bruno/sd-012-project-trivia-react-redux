import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';

export default combineReducers({
  player,
  questions,
});
