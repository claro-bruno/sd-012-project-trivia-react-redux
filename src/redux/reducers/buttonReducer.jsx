import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_ERROR } from '../action';

const INITIAL_STATE = {
  token: '',
  error: null,
  isLoading: false,
  numeroQuestoes: 5,
  difficulty: 0,
  type: 0,
  category: 0,
};

const buttonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      error: null,
      isLoading: false,
      token: action.payload,
    };
  case GET_TOKEN_ERROR:
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  case 'SET_AMOUNT':
    return {
      ...state,
      numeroQuestoes: action.value.quantidade,
      difficulty: action.value.difficulty,
      type: action.value.type,
      category: action.value.category,
    };
  default:
    return state;
  }
};

export default buttonReducer;
