import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';
import settings from './settings';

const reducer = combineReducers({ login, questions, settings });

export default reducer;
