import { GET_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: [...action.payload],
    };
  default:
    return state;
  }
}
