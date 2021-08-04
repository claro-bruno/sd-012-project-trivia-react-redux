import { SAVE_EMAIL, SAVE_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.email };
  case SAVE_NAME:
    return { ...state, name: action.name };
  default:
    return state;
  }
};

export default user;
