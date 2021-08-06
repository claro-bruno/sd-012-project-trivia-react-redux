import { ADD_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
};

export default function addAssertionsReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case ADD_ASSERTIONS: return {
    ...state,
    assertions: payload,
  };
  default: return state;
  }
}
