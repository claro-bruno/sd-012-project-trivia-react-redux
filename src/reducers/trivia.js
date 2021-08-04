import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_NAME } from '../actions/actionsType';

const INITIAL_STATE = {
  questions: [],
  name: '',
  email: '',
};

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state };
  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: [...action.payload] };
  case GET_NAME:
    return { ...state, name: action.name, email: action.email };
  default:
    return { ...state };
  }
}

export default trivia;
