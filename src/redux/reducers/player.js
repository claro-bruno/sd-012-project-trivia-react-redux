import { GET_USER_DATA, SCORE_UPDATE } from '../actions/types';

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
  default:
    return state;
  }
};

export default player;
