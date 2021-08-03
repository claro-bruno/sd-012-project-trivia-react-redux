import { combineReducers } from 'redux';
import userReducer from './player';
import userInfosReducer from './userInfo';

const rootReducer = combineReducers({ userReducer, userInfosReducer });

export default rootReducer;
