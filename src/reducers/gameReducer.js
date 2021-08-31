import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  UPDATE_TIMER,
  RESET_TIMER,
} from '../actions';

const maxTime = 30;

const INITIAL_STATE = {
  questions: [],
  timer: maxTime,
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
  case UPDATE_TIMER:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case RESET_TIMER:
    return {
      ...state,
      timer: maxTime,
    };
  default:
    return state;
  }
};

export default gameReducer;
