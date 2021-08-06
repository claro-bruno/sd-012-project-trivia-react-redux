import { GLOBAL_KEY, TIMER_DECREMENT } from '../actions/timer';

const INICIAL_STATE = {
  globalKey: false,
  time: 5,
};

const questions = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GLOBAL_KEY:
    return { ...state, globalKey: action.status, time: 30 };
  case TIMER_DECREMENT:
    console.log(state.time);
    return { ...state, time: state.time - 1 };
  default:
    return state;
  }
};

export default questions;
