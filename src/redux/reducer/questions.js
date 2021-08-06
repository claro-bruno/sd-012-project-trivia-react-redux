import { OPTIONS_DISABLED } from '../actions/optionsDisabled';
import { SCORE_UPDATE, SEND_CRONOMETER, STOP_TIME } from '../actions/questions';

const INITIAL_STATE = {
  optionsDisabled: false,
  time: 5,
  stopTime: false,
  score: 0,
  assertions: 0,
  nextVisible: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case OPTIONS_DISABLED:
    return { ...state, optionsDisabled: action.status, stopTime: action.status };
  case SEND_CRONOMETER:
    return { ...state, time: state.time - 1 };
  case SCORE_UPDATE:
    return { ...state,
      score:
        state.score + (action.answerValue + (action.diffucultyValue * state.time)) - 2,
      assertions: state.assertions + 1 };
  case STOP_TIME: {
    console.log('reducer stop time');
    return { ...state, stopTime: true, nextVisible: true };
  }
  default:
    return state;
  }
};

export default questions;
