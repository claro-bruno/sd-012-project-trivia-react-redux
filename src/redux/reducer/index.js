import { combineReducers } from 'redux';
import login from './login';
import questions from './questions';
import nextQuestion from './nextQuestion';

const reducer = combineReducers({ login, questions, nextQuestion });

export default reducer;
