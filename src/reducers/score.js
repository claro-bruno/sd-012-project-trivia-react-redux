import { GET_SCORE } from '../actions/index';

const INITIAL_STATE = {
  score: 0,
};

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_SCORE:
    return {
      score: action.value,
    };
  default:
    return state;
  }
};

export default score;
