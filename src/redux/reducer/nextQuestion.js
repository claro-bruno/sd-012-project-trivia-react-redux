import { NEXT_QUESTION } from '../actions/nextQuestion';

const INITIAL_STATE = {
  nextCount: 0,
  nextVisible: false,
};

const nextQuestion = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION: {
    let num = 0;
    if (action.status) num = 1;
    return { ...state, nextVisible: action.status, nextCount: state.nextCount + num };
  }
  default:
    return state;
  }
};

export default nextQuestion;
