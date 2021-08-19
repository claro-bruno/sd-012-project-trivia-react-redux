import { USER_LOGIN, RIGTH_ANSWERS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, name: action.name, email: action.email,
    };
  case RIGTH_ANSWERS:
    return { ...state, score: action.score, assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default login;
