import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import player from './player';
import answers from './answers';

const rootReducers = combineReducers({ player, gameReducer, answers });

export default rootReducers;
