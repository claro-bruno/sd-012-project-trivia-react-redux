import {
  USER_ACTION,
  GET_TOKEN,
  GET_TOKEN_ERROR,
  GET_TOKEN_SUCCESS,
  USER_ACTION_NAME,
  USER_ACTION_HASH,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  hash: '',
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
    return ({ ...state, email: action.payload });
  case USER_ACTION_NAME:
    return ({ ...state, name: action.payload });
  case USER_ACTION_HASH:
    return ({ ...state, hash: action.payload });
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
