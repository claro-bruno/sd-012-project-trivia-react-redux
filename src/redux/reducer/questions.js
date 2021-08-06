import { GLOBAL_KEY, TIMER_DECREMENT } from '../actions/timer';
import { NEXT_QUESTION } from '../actions/nextQuestion';

const INICIAL_STATE = {
  globalKey: false,
  time: 30,
  nextQuestion: 0,
};

const questions = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GLOBAL_KEY:
    return { ...state, globalKey: action.status, time: 30 };
  case TIMER_DECREMENT:
    return { ...state, time: state.time - 1 };
  case NEXT_QUESTION:
    return { ...state, nextQuestion: state.nextQuestion + 1 };
  default:
    return state;
  }
};

export default questions;
