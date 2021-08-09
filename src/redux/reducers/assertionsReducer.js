import { ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
};

function assertionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ASSERTIONS:
    return {
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default assertionsReducer;
