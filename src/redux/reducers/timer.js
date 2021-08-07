import { REAL_TIME } from '../actions/actionTimer';

const INITIAL_STATE = { time: 30, timeOff: false };

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REAL_TIME:
    return {
      ...state,
      time: action.state.timer,
      timeOff: action.state.timeOff,
    };
  default:
    return { ...state };
  }
};

export default timerReducer;
