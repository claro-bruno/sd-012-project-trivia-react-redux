import { GET_USER_DATA, SCORE_UPDATE, GUESS_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_UPDATE:
    return {
      ...state,
      score: state.score + action.point,
    };
  case GET_USER_DATA:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case GUESS_UPDATE:
    return {
      ...state, assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
