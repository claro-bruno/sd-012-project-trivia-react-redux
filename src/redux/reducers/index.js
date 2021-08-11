import { combineReducers } from 'redux';
import game from './game';
import user from './user';
import timer from './timer';
import config from './config';

const rootReducer = combineReducers({ user, game, timer, config });

export default rootReducer;
