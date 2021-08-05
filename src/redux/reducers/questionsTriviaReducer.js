import {
  GET_API_TRIVIA_QUESTIONS_SUCESS,
  GET_API_TRIVIA_ERRORS,
  GET_API_TRIVIA_QUESTIONS,
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
      questions: payload.questions,
      token: payload.token,
    };

  case GET_API_TRIVIA_ERRORS:
    return {
      ...state,
      isLoading: false,
      error: payload,
    };

  default:
    return state;
  }
};

export default questionsTriviaReducer;
