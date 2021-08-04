import { combineReducers } from 'redux';
import addLoginReducer from './addLoginReducer';
import tokenTriviaReducer from './tokenTriviaReducer';

const rootReducer = combineReducers({
  addLoginReducer,
  tokenTriviaReducer,
});

export default rootReducer;
