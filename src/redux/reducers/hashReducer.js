import { HASH } from '../actions/index';

const INITIAL_STATE = {
  hash: '',
};

const hashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HASH:
    return {
      hash: action.hash,
    };
  default:
    return state;
  }
};

export default hashReducer;
