import { combineReducers } from 'redux';
import userInfo from './userInfo';
import settings from './settings';

const rootReducer = combineReducers({ userInfo, settings });

export default rootReducer;
