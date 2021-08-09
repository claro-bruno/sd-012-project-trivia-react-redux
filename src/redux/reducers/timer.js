import { REAL_TIME, PAUSE_TIME } from '../actions/actionTimer';

const INITIAL_STATE = {
  time: 30,
  timeOff: false,
  pauseTimer: false,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REAL_TIME:
    console.log(action);
    return {
      ...state,
      time: action.state.timer,
      timeOff: action.state.timeOff,
    };
  case PAUSE_TIME:
    return {
      ...state,
      pauseTimer: action.state.stopTimer,
    };
  default:
    return { ...state };
  }
};

export default timerReducer;
