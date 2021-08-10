import { CORRECT_ANSWER } from '../actions';

const INITIAL_STATE = {
  questions: {},
  score: 0,
  assertions: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_QUESTIONS_SUCCESS':
    return {
      ...state,
      questions: action.payload,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default gameReducer;
