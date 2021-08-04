import { CREATE_LOGIN } from '../actions/index';

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
  default:
    return state;
  }
}
