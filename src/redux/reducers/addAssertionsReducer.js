import { ADD_ASSERTIONS, ADD_STORAGE } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
};

export default function addAssertionsReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case ADD_ASSERTIONS: return {
    ...state,
    assertions: state.assertions + payload,
  };
  case ADD_STORAGE: {
    localStorage('Hanking', ...payload);
    return state;
  }
  default: return state;
  }
}
