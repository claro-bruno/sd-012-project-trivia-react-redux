import { combineReducers } from 'redux';
import user from './user';
import quest from './quest';

const rootReducer = combineReducers({ user, quest });

export default rootReducer;
