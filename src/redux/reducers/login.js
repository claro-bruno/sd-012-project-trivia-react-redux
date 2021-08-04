import { SAVE_LOGIN } from '../actions/actionsLogin';

const INITIAL_STATE = {
  email: '',
  name: '',
  hashEmail: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      email: action.email,
      name: action.name,
      hashEmail: action.hashEmail,
    };
  default:
    return { ...state };
  }
};

export default login;
