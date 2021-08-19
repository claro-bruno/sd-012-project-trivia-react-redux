import { combineReducers } from 'redux';
import login from './user';
import getQuestions from './getQuestions';
import userTimer from './userTimer';

const rootReducer = combineReducers({ login, getQuestions, userTimer });

export default rootReducer;
