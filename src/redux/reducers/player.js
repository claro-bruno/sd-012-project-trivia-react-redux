import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
} from '../actions';

const INITIAL_STATE = {
  info: {},
  isFetching: true,
  error: '',
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
  default:
    return state;
  }
};

export default userReducer;
