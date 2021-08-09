import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import player from './player';

const rootReducers = combineReducers({ player, gameReducer });

export default rootReducers;
