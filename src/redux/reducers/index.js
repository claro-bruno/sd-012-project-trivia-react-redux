import { combineReducers } from 'redux';
import loginReducers from './loginReducers';

const rootReducer = combineReducers({ loginReducers });

export default rootReducer;
