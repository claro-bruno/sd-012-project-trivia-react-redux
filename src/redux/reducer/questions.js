import { GLOBAL_KEY, TIMER_DECREMENT, SCORE_UPDATE } from '../actions/questions';
import { NEXT_QUESTION, RESET_QUESTIONS } from '../actions/nextQuestion';

const INICIAL_STATE = {
  globalKey: false,
  time: 30,
  nextQuestion: 0,
  score: 0,
  assertions: 0,
};

const questions = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GLOBAL_KEY:
    return { ...state, globalKey: action.status, time: 30 };
  case TIMER_DECREMENT:
    return { ...state, time: state.time - 1 };
  case NEXT_QUESTION:
    return { ...state, nextQuestion: state.nextQuestion + 1 };
  case SCORE_UPDATE: {
    const dez = 10;
    return { ...state,
      assertions: state.assertions + 1,
      score: state.score + (state.time * action.difficulty) + dez };
  }
  case RESET_QUESTIONS:
    return { ...state, nextQuestion: 0 };
  default:
    return state;
  }
};

export default questions;
