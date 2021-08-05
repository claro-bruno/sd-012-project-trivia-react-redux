import { combineReducers } from 'redux';
import player from './player';
import login from './login';

const rootReducer = combineReducers({ player, login });

export default rootReducer;

