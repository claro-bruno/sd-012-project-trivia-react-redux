import {
  GET_API_TRIVIA_QUESTIONS,
  GET_API_TRIVIA_QUESTIONS_SUCESS,
  GET_API_TRIVIA_QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: null,
  isLoading: false,
};

const questionsTriviaReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_API_TRIVIA_QUESTIONS:
    return {
      ...state,
      isLoading: true,
    };

  case GET_API_TRIVIA_QUESTIONS_SUCESS:
    return {
      ...state,
      isLoading: false,
      questions: payload.results,
    };

  case GET_API_TRIVIA_QUESTIONS_ERROR:
    return {
      ...state,
      error: payload,
    };

  default:
    return state;
  }
};

export default questionsTriviaReducer;
