import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  NEXT_QUESTIONS,
  CHANGE_CLASS,
} from '../actions/actionsTypes';

const normalButton = 'btn answer-btn';

const INITIAL_STATE = {
  questions: [],
  isLoading: true,
  questionNumber: 0,
  cBtnClass: normalButton,
  wBtnClass: normalButton,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      error: null,
      questions: action.payload,
      isLoading: false,
    };
  case GET_QUESTIONS_ERROR:
    return { ...state, error: action.error };
  case NEXT_QUESTIONS:
    return {
      ...state,
      questionNumber: state.questionNumber + 1,
      cBtnClass: normalButton,
      wBtnClass: normalButton,
    };
  case CHANGE_CLASS:
    return {
      ...state,
      cBtnClass: action.correct,
      wBtnClass: action.wrong,
    };
  default:
    return state;
  }
};

export default game;
