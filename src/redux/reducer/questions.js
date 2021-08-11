import { GET_QUESTION, GET_QUESTION_SUCCESS,
  GET_QUESTION_ERROR, SET_SCORE } from '../action';

const STATE_INITIAL = ({
  results: [],
  loading: false,
  error: null,
  score: 0,
  assertions: 0,
});

const questions = (state = STATE_INITIAL, action) => {
  switch (action.type) {
  case GET_QUESTION:
    return {
      ...state,
      loading: true,
    };

  case GET_QUESTION_SUCCESS:
    return {
      ...state,
      results: [...action.payload],
      loading: false,
    };

  case GET_QUESTION_ERROR:
    return {
      ...state,
      error: action.payload.erro,
      loading: false,
    };

  case SET_SCORE:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };

  default:
    return state;
  }
};

export default questions;
