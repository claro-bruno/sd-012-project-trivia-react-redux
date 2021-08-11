import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
  SCORE_PLAYER,
} from '../actions';

const INITIAL_STATE = {
  info: {},
  isFetching: true,
  error: '',
  score: 0,
  timer: 30,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_TOKEN_SUCCESS:
    return {
      ...state,
      info: action.payload,
      isFething: false,
    };
  case REQUEST_TOKEN_ERROR:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  case SCORE_PLAYER:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
