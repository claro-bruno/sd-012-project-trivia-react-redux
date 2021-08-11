import { QUIZ_START, QUIZ_SUCCESS, GET_SCORE, GET_CORRECTS } from '../actions';

const initialState = {
  fetch: false,
  quiz: '',
  score: 0,
  assertions: 0,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
  case QUIZ_START:
    return {
      ...state,
      fetch: action.payload.fetch,
    };
  case QUIZ_SUCCESS:
    return {
      ...state,
      fetch: action.payload.fetch,
      quiz: action.payload.results,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case GET_CORRECTS:
    return {
      ...state,
      assertions: action.payload,
    };
  default: return state;
  }
};

export default quizReducer;
