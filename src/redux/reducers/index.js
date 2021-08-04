import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import game from './game';

const rootReducer = combineReducers({ loginReducers, game });

export default rootReducer;
