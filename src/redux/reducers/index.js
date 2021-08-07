import { combineReducers } from 'redux';
import login from './login';
import timerReducer from './timer';

const reducer = combineReducers({ login, timerReducer });

export default reducer;
