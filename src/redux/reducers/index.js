import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import nameReducer from './nameReducer';
import tokenReducer from './tokenReducer';
import loadingReducer from './loadingReducer';
import disabledReducer from './disabledReducer';
import timerReducer from './timerReducer';
import scoreReducer from './scoreReducer';
import assertionsReducer from './assertionsReducer';
import rankingReducer from './rankingReducer';

const rootReducer = combineReducers(
  {
    emailReducer,
    nameReducer,
    tokenReducer,
    loadingReducer,
    disabledReducer,
    timerReducer,
    scoreReducer,
    assertionsReducer,
    rankingReducer,
  },
);

export default rootReducer;
