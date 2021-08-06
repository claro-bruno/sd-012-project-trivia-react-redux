import { GET_SECONDS } from '../actions/actionTypes';

const INITIAL_STATE = {
  seconds: '',
};

const getSeconds = (state = INITIAL_STATE, { type, seconds }) => {
  switch (type) {
  case GET_SECONDS:
    return { ...state, seconds };

  default:
    return state;
  }
};

export default getSeconds;
