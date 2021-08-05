import { REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...action,
    };
  default:
    return state;
  }
};

export default questions;
