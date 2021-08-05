import { combineReducers } from 'redux';
import user from './userReducer';
import fetchReducers from './fetchReducers';

const rootReducer = combineReducers({
  user,
  fetchReducers,
});

export default rootReducer;
