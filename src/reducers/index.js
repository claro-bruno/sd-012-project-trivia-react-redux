import { combineReducers } from 'redux';
import player from './player';
import game from './game';
import ranking from './ranking';
import settings from './settings';

const rootReducer = combineReducers({ player, game, ranking, settings });
export default rootReducer;
