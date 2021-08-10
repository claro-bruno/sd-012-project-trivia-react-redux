import { CREATE_LOGIN, GET_SCORE } from '../actions/index';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_LOGIN:
    return {
      ...state,
      player: {
        name: action.name,
        gravatarEmail: action.gravatarEmail,
      },
    };
  case GET_SCORE:
    return {
      ...state,
      player: {
        assertions: action.assertions,
        score: action.score,
      },
    };
  default:
    return state;
  }
}
