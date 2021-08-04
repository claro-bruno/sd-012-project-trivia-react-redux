import { combineReducers } from 'redux';
import addLoginReducer from './addLoginReducer';

const rootReducer = combineReducers({
  addLoginReducer,
});

export default rootReducer;
