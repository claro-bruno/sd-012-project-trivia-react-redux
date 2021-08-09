import { CURRENT_SCORE } from '../actions';

const INTIAL_STATE = {
  currentScore: 0,
};

const gameReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case CURRENT_SCORE:
    return { ...state, currentScore: action.payload };

  default:
    return state;
  }
};

export default gameReducer;
