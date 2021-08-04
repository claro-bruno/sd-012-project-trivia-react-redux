import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {};

function addLoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...state,
      login: action.payload,
    };
  default:
    return state;
  }
}

export default addLoginReducer;
