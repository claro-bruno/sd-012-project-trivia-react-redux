import { REQUEST_QUESTIONS, RECEIVED_QUESTIONS, FAILED_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  response_code: 8,
  questions: [],
  loading: false,
  error: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      loading: true,
    };
  case RECEIVED_QUESTIONS:
    return {
      ...state,
      loading: false,
      response_code: action.questionsData.response_code,
      questions: [...action.questionsData.results],
    };
  case FAILED_QUESTIONS:
    return {
      ...state,
      loading: false,
      error: true,
    };
  default:
    return state;
  }
};

export default questions;
