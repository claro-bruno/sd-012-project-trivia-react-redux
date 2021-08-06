import { combineReducers } from 'redux';
import login from './login';
import timer from './timer';

const reducer = combineReducers({ login, timer });

export default reducer;
