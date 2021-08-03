import { GET_TOKEN_SUCCESS, GET_QUESTIONS_SUCCESS } from '../actions/actionsType';

const INITIAL_STATE = {
  token: '',
  questions: [],
};

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    return { ...state, token: action.payload };
  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: [...action.payload] };
  default:
    return state;
  }
}

export default trivia;
