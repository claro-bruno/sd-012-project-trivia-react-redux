import { combineReducers } from 'redux';
import player from './player';
import buttonReducer from './buttonReducer';

const rootreducer = combineReducers({ player, buttonReducer });

export default rootreducer;
