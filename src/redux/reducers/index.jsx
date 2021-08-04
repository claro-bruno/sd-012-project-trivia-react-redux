// reducers/index.jsx

import { combineReducers } from 'redux';
import reducer from './reducer';
import gameReducer from './gameReducer';

const rootReducers = combineReducers({ reducer, gameReducer });
export default rootReducers;
