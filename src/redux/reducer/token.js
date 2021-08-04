import { GET_TOKEN, GET_TOKEN_FAILED, GET_TOKEN_SUCCESS } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
      loading: false,
    };
  case GET_TOKEN_FAILED:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default tokenReducer;
