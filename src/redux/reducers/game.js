import { isLastQuestion } from '../../data/helpers';

const INITIAL_STATE = {
  questions: [],
  questionsError: {},
  isFetchingQuestions: false,
  currentQuestion: 0,
  isLastQuestion: false,
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_QUESTIONS_REQUEST':
    return {
      ...state,
      isFetchingQuestions: true,
    };
  case 'GET_QUESTIONS':
    return {
      ...state,
      questions: [...action.response.results],
      isFetchingQuestions: false,
      isLastQuestion: false,
    };
  case 'GET_QUESTIONS_ERROR':
    return {
      ...state,
      questionsError: { ...action.error },
      isFetchingQuestions: false,
    };
  case 'NEXT_QUESTION':
    if (isLastQuestion(state)) {
      return {
        ...state,
        currentQuestion: state.questions.length - 1,
        isLastQuestion: true,
      };
    }
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
    };

  default: return state;
  }
}

export default game;
