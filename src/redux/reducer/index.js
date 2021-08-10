import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  loginReducer,
  tokenReducer,
  gameReducer,
});

export default rootReducer;
