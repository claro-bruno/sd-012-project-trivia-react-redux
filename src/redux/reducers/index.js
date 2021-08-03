import { combineReducers } from 'redux';
import game from './game';
import user from './user';

const rootReducer = combineReducers({ user, game });

export default rootReducer;
