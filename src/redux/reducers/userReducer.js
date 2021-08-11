import {
  USER_ACTION,
  USER_ACTION_NAME,
  USER_ACTION_HASH,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_SCORE,
  PLAY_AGAIN,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  hash: '',
  assertions: '',
  score: 0,
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
  case GET_SCORE:
    return ({ ...state, score: Number(state.score) + action.payload });
  case PLAY_AGAIN:
    return ({ ...state, score: action.payload });
  default:
    return state;
  }
}

export default user;
