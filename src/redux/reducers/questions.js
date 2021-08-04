import {
  REQUEST_QUESTIONS,
  REQUEST_QUESTIONS_SUCCESS,
  REQUEST_QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  error: '',
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: action.payload,
      isFetching: false,
    };
  case REQUEST_QUESTIONS_ERROR:
    return {
      ...state,
      isFetching: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default questionsReducer;
