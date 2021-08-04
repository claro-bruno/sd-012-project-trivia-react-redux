import { SAVE_LOGIN, LOADING, GET_TOKEN, GET_TOKEN_ERROR } from '../actions/login';

const INICIAL_STATE = {
  name: '',
  email: '',
  loading: false,
  token: '',
  erroToken: '',
};

const login = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return { ...state, name: action.name, email: action.email };
  case LOADING:
    return { ...state, loading: true };
  case GET_TOKEN:
    return { ...state, token: action.payload, loading: false };
  case GET_TOKEN_ERROR:
    return { ...state, erroToken: action.payload, loading: false };
  default:
    return state;
  }
};

export default login;
