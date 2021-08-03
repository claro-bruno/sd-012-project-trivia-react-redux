import { combineReducers } from 'redux';
import PlayerReducer from './Player';

const rootReducers = combineReducers(
  {
    PlayerReducer,
  },
);

export default rootReducers;
