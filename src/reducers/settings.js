import {
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORIES_ERROR,
  REQUEST_CATEGORIES,
  SET_PARAMETERS,
} from '../actions';

const INITIAL_STATE = {
  parameters: {
    categoryId: 0,
    difficulty: '',
    type: '',
  },
  categories: [],
  loading: false,
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return {
      ...state,
      loading: true,
    };
  case RECEIVE_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
      loading: false,
    };
  case RECEIVE_CATEGORIES_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  case SET_PARAMETERS:
    return {
      ...state,
      parameters: action.payload,
    };
  default:
    return state;
  }
};

export default settings;
