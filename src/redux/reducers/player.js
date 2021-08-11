import {
  CREATE_LOGIN,
  GET_SCORE,
  SAVE_AVATAR,
  RESET_ASSERTIONS,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  gravatarUrl: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case SAVE_AVATAR:
    return { ...state, gravatarUrl: action.avatar };
  case GET_SCORE:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  case RESET_ASSERTIONS:
    return { ...state, assertions: 0, score: 10 };
  default:
    return state;
  }
}
