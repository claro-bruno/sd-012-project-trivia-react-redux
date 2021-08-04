import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR } from '../actions';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
};

function gameToken(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      isLoading: false,
    };
  case GET_TOKEN_ERROR:
    return {
      ...state,
      Error,
    };
  default:
    return state;
  }
}

export default gameToken;
