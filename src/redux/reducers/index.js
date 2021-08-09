import { combineReducers } from 'redux';
import game from './game';
import user from './user';
import timer from './timer';

const rootReducer = combineReducers({ user, game, timer });

export default rootReducer;
