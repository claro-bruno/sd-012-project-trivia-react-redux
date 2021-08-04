import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import nameReducer from './nameReducer';

const rootReducer = combineReducers({ emailReducer, nameReducer });

export default rootReducer;
