import { SAVE_LOGIN } from '../actions';

const INICIAL_STATE = {
  name: '',
  email: '',
};

const login = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return { ...state, name: action.name, email: action.email };
  default:
    return state;
  }
};

export default login;
