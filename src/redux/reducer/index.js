import { combineReducers } from 'redux';

const INITIAL_STATE = {};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

const rootReducer = combineReducers({ game });

export default rootReducer;
