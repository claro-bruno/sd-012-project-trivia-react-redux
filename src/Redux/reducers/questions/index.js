import { GET_QUESTIONS } from './actions/getQuestions';
import { GET_CHANGES } from './actions/getChanges';
import { GET_CATEGORIES } from './actions/getCategories';
import { GET_CONFIG } from './actions/getConfig';

const INITIAL_STATE = {
  config: {
    amount: '1',
    category: '',
    difficulty: '',
    type: '',
  },
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
  case GET_CONFIG:
    return { ...state, config: { ...state.config, ...action.config } };
  default:
    return state;
  }
};

export default questions;
