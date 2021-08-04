import { combineReducers } from 'redux';
import gravatar from './gravatar';
import token from './token';

const rootReducer = combineReducers({ gravatar, token });

export default rootReducer;
