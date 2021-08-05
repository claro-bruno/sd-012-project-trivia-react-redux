/* import {
  GET_API_TRIVIA_TOKEN,
  GET_API_TRIVIA_TOKEN_SUCESS,
  GET_API_TRIVIA_TOKEN_ERROR,
} from '../actions';

const INITIAL_STATE = {
  token: '',
  error: null,
  isLoading: false,
};

const tokenTriviaReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_API_TRIVIA_TOKEN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_API_TRIVIA_TOKEN_SUCESS:
    return {
      ...state,
      isLoading: false,
      token: payload.token,
    };

  case GET_API_TRIVIA_TOKEN_ERROR:
    return {
      ...state,
      isLoading: false,
      error: payload,
    };

  default:
    return state;
  }
};

export default tokenTriviaReducer;
 */
