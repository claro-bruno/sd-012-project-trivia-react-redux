import { SAVE_LOGIN, GET_TOKEN } from '../actions/login';

const INICIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

const login = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return { ...state, name: action.name, email: action.email };
  case GET_TOKEN:
    return { ...state, token: action.response };
  default:
    return state;
  }
};

export default login;
