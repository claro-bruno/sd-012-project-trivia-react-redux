import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './token';
import gameReducer from './gameReducer';
import settingsReducer from './settings';

const rootReducer = combineReducers({
  loginReducer,
  tokenReducer,
  gameReducer,
  settingsReducer,
});

export default rootReducer;
