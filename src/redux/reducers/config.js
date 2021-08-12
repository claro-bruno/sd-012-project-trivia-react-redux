import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  categories: [],
  catLoading: false,
  category: '',
  difficulty: '',
  type: '',
};

const config = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case types.REQUEST_CATEGORIES:
    return { ...state, catLoading: true };
  case types.GET_CATEGORIES:
    return { ...state, categories: action.categories, catLoading: false };
  case types.UPDATE_CONFIG:
    return { ...state, ...action.config };
  default:
    return state;
  }
};

export default config;
