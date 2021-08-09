import { REQUEST_TRIVIA } from '../actions';

const INTIAL_STATE = {
  questions: [],
  difficulty: 'easy',
};

const gameReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TRIVIA:
    return {
      ...state, questions: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
