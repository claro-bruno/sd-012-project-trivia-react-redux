import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';

const rootReducers = combineReducers(
  {
    player,
    token,
    questions,
  },
);

export default rootReducers;
