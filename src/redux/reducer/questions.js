import { OPTIONS_DISABLED } from '../actions/optionsDisabled';
import { SEND_ANSWER, SEND_CRONOMETER, STOP_TIME } from '../actions/questions';

const INICIAL_STATE = {
  optionsDisabled: false,
  time: 30,
  stopTime: false,
  score: 0,
};

const questions = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case OPTIONS_DISABLED:
    return { ...state, optionsDisabled: true };
  case SEND_CRONOMETER:
    return { ...state, time: state.time - 1 };
  case SEND_ANSWER:
    return { ...state,
      score: (action.pAnswer + (action.pDifficulty * state.time)) };
  case STOP_TIME:
    return { ...state, stopTime: true };
  default:
    return state;
  }
};

export default questions;
