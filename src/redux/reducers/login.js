import { SAVE_LOGIN } from '../actions/actionsLogin';
import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  GET_TOKEN_LOADING,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
  hashEmail: '',
  isLoading: false,
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
  case GET_TOKEN:
    return {
      ...state,
    };

  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
      isLoading: action.isLoading,
    };

  case GET_TOKEN_ERROR:
    return {
      ...state, error: action.error,
    };

  case GET_TOKEN_LOADING:
    return {
      ...state, isLoading: true,
    };
  default:
    return { ...state };
  }
};

export default login;
