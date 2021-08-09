import { combineReducers } from 'redux';
import login from './login';
import timerReducer from './timer';
import player from './player';

const reducer = combineReducers({ login, timerReducer, player });

export default reducer;
