import { combineReducers } from 'redux';
import user from './user';
import trivia from './trivia';
import config from './config';

const rootReducer = combineReducers({ user, trivia, config });

export default rootReducer;
