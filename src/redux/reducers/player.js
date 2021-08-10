import { PLAYER } from '../actions/actionPlayer';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.name,
      assertions: action.assertions,
      score: state.score + action.score,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return ({ ...state });
  }
};

export default player;
