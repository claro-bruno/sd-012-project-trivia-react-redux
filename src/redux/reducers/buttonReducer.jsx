import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_ERROR } from '../action';

const INITIAL_STATE = {
  token: '',
  error: null,
  isLoading: false,
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

  default:
    return state;
  }
};

export default buttonReducer;
