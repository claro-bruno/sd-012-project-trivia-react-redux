import { combineReducers } from 'redux';
import userReducer from './player';

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
