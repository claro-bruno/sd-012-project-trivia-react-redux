import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_ERROR } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
  error: null,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_QUESTIONS:
    return {
      ...INITIAL_STATE,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: payload,
      isLoading: false,
    };
  case GET_QUESTIONS_ERROR:
    return {
      ...state,
      error: payload,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default gameReducer;
