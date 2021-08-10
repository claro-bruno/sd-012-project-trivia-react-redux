import { GET_QUESTION_SUCCESS, GET_QUESTION_ERROR } from '../action';

const STATE_INITIAL = ({
  results: [],
});

const questions = (state = STATE_INITIAL, action) => {
  switch (action.type) {
  case GET_QUESTION_SUCCESS:
    return {
      ...state,
      results: action.payload,
    };

  case GET_QUESTION_ERROR:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default questions;
