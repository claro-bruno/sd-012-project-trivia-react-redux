import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  user: '',
  email: '',
};

function addLoginReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case ADD_LOGIN:
    return {
      ...state,
      user: payload.user,
      email: payload.email,
    };
  default:
    return state;
  }
}

export default addLoginReducer;
