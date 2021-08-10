import SCORE from '../actions/index';

const USER_INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const gameReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.totalAssertions,
    };
  default:
    return state;
  }
};
export default gameReducer;
