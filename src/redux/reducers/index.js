import { combineReducers } from 'redux';
import userReducer from './player';
import userInfosReducer from './userInfo';
import questionsReducer from './questions';

const rootReducer = combineReducers({ userReducer, userInfosReducer, questionsReducer });

export default rootReducer;
