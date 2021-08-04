import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS } from '../actions/actionsType';

const INITIAL_STATE = {
  questions: [],
  loading: false,
};

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, loading: true };
  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: [...action.payload], loading: false };
  default:
    return { ...state };
  }
}

export default trivia;
