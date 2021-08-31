import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  UPDATE_TIMER,
  RESET_TIMER,
  NEXT_QUESTION,
} from '../actions';

const maxTime = 30;

const INITIAL_STATE = {
  questions: [],
  question: {},
  timer: maxTime,
  isLoading: true,
  error: null,
};

const getNextQuestion = (
  { questions, question },
) => questions[questions.indexOf(question) + 1];

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
      question: payload[0],
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
  case NEXT_QUESTION:
    return {
      ...state,
      question: getNextQuestion(state),
    };
  default:
    return state;
  }
};

export default gameReducer;
