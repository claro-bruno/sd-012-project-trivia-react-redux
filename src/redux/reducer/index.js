import { combineReducers } from 'redux';
import user from './user';
import tokenReducer from './token';

const rootReducer = combineReducers({ user, tokenReducer });

export default rootReducer;
