import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';

const rootReducer = combineReducers({
  loginReducer,
  tokenReducer,
});

export default rootReducer;
