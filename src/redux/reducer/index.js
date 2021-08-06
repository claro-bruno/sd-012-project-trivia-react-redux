import { combineReducers } from 'redux';
import user from './user';
import tokenReducer from './token';
import quizReducer from './quiz';

const rootReducer = combineReducers({ user, tokenReducer, quizReducer });

export default rootReducer;
