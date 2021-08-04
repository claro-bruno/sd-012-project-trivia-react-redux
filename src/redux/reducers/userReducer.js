import {
  USER_ACTION,
  GET_TOKEN,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  ranking: '',
  token: '',
  error: 'Não encontrado',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_ACTION:
    if (action.payload === 'email') {
      return ({ ...state, email: action.value });
    }
    return ({ ...state, email: action.value });
  case GET_TOKEN:
    return ({ ...state });
  case GET_TOKEN_SUCCESS:
    return ({ ...state, token: action.token });
  case GET_TOKEN_ERROR:
    return ({ ...state, error: action.error });
  default:
    return state;
  }
}

export default user;
