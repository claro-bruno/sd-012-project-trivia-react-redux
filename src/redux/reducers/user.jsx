import { USER_LOGIN, REQUEST_API, REQUEST_API_SUCCESS } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.payload, name: action.payload };
  case REQUEST_API:
    return { ...state };
  case REQUEST_API_SUCCESS:
    return { ...state, token: action.payload };
  default: return state;
  }
};

export default user;
