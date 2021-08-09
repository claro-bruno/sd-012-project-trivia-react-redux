import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import settings from './settings';

const rootReducer = combineReducers({ user, game, settings });

export default rootReducer;
