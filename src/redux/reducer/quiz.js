import { QUIZ_START, QUIZ_SUCCESS } from '../actions';

const initialState = {
  fetch: false,
  quiz: '',
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
  default: return state;
  }
};

export default quizReducer;
