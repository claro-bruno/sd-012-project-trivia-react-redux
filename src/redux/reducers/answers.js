import { ACTION_SHOW_ANSWERS } from '../actions';

const INITIAL_STATE = {
  show: false,
};

const answers = (state = INITIAL_STATE, { type, show }) => {
  switch (type) {
  case ACTION_SHOW_ANSWERS:
    return { ...state, show };
  default:
    return state;
  }
};

export default answers;
