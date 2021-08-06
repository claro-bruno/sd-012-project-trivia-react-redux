import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  GET_PLAYER_USER_INFO } from '../actions';

const INITIAL_STATE = {
  token: '',
  userInfo: {},
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
  case GET_PLAYER_USER_INFO:
    return {
      ...state,
      userInfo: { ...action.payload },
    };
  default:
    return state;
  }
}

export default gameToken;
