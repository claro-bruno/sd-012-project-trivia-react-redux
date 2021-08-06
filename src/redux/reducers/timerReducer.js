import { TIMER } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

function timerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIMER:
    return {
      ...state,
      timer: action.timer,
    };
  default: return state;
  }
}

export default timerReducer;
