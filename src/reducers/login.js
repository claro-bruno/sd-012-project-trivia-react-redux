import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_ERROR } from '../redux/actions';

const INITIAL_STATE = {
  user: {
    email: '',
    token: '',
  },
};

/* export default function login(state = INITIAL_STATE) {
  return state;
} */

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
    };

  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
    };

  case GET_TOKEN_ERROR:
    return {
      ...state, error: action.error,
    };

  default:
    return { ...state };
  }
};
export default login;
