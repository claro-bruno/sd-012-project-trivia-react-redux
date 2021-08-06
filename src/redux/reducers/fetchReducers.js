import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  error: '',
};

function fetchReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state };
  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: action.payload };
  case GET_QUESTIONS_ERROR:
    return { ...state, error: 'Impossível fazer requisição' };
  default:
    return state;
  }
}

export default fetchReducers;
