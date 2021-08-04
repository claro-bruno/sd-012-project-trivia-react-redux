import { API } from '../actions';

const QUESTIONS_INITIAL_STATE = {
  questions: {},
};

const login = (state = QUESTIONS_INITIAL_STATE, action) => {
  switch (action.type) {
  case API:
    console.log(action.payload);
    return {
      questions: action.payload,
    };
  default:
    return state;
  }
};
export default login;
