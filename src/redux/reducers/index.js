import { combineReducers } from 'redux';
import addLoginReducer from './addLoginReducer';
// import tokenTriviaReducer from './tokenTriviaReducer';
import questionsTriviaReducer from './questionsTriviaReducer';
import gravatarReducer from './gravatarReducer';

const rootReducer = combineReducers({
  addLoginReducer,
  // tokenTriviaReducer,
  questionsTriviaReducer,
  gravatarReducer,
});

export default rootReducer;
