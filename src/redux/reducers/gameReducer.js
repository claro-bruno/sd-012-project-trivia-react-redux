import {
  REQUEST_TRIVIA,
  REQUEST_ERROR,
  NEXT_QUESTION,
  CURRENT_SCORE,
  PLAYER_ASSERTIONS } from '../actions';

const INTIAL_STATE = {
  qIndex: 0,
  difficulty: 'easy',
  questions: [],
  currentScore: 0,
  assertions: 0,
};

const gameReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TRIVIA:
    return { ...state, questions: action.payload };
  case REQUEST_ERROR:
    return { ...state, error: action.payload };
  case NEXT_QUESTION:
    return { ...state,
      qIndex: state.qIndex + 1,
    };
  case CURRENT_SCORE:
    return { ...state, currentScore: state.currentScore + action.payload };
  case PLAYER_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  default:
    return state;
  }
};

export default gameReducer;
