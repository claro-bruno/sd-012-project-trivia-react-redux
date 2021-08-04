import { combineReducers } from 'redux';
import addLoginReducer from './addLoginReducer';
import tokenTriviaReducer from './tokenTriviaReducer';
import questionsTriviaReducer from './questionsTriviareducer';

const rootReducer = combineReducers({
  addLoginReducer,
  tokenTriviaReducer,
  questionsTriviaReducer,
});

export default rootReducer;
