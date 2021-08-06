import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';

const reducer = combineReducers({ login, questions });

export default reducer;
