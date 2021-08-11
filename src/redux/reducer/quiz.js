import { QUIZ_START, QUIZ_SUCCESS, GET_SCORE } from '../actions';

const initialState = {
  fetch: false,
  quiz: '',
  score: 0,
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
  default: return state;
  }
};

export default quizReducer;
