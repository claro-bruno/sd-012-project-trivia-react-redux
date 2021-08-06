import { combineReducers } from 'redux';
import addLoginReducer from './addLoginReducer';
import tokenTriviaReducer from './tokenTriviaReducer';
import questionsTriviaReducer from './questionsTriviaReducer';
import addAssertionsReducer from './addAssertionsReducer';

const rootReducer = combineReducers({
  addLoginReducer,
  tokenTriviaReducer,
  questionsTriviaReducer,
  addAssertionsReducer,
});

export default rootReducer;
