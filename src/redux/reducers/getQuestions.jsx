import { USER_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const saveQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_QUESTIONS:
    return { ...state, questions: [...action.result],
    };
  default:
    return state;
  }
};

export default saveQuestions;
