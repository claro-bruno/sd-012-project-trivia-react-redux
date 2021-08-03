import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return { ...state, name: action.name, email: action.email };
  default:
    return state;
  }
};

export default loginReducer;
