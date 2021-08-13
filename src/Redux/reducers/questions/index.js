import { GET_QUESTIONS } from './actions/getQuestions';
import { GET_CHANGES } from './actions/getChanges';
import { GET_CATEGORIES } from './actions/getCategories';

const INITIAL_STATE = {
  questions: [],
  loaded: false,
  receivedSettings: false,
  categories: [],
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: action.questions, loaded: true };
  case GET_CHANGES:
    return { ...state, receivedSettings: true };
  case GET_CATEGORIES:
    return { ...state, categories: action.categories };
  default:
    return state;
  }
};

export default questions;
