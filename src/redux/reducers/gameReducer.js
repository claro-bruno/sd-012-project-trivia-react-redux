import {
  REQUEST_API_GAME_LOADING,
  REQUEST_API_GAME_SUCCESS,
  REQUEST_API_GAME_ERROR,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
  error: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_GAME_LOADING:
    return {
      ...state,
      isFetching: action.isFetching,
    };
  case REQUEST_API_GAME_SUCCESS:
    return {
      ...state,
      questions: action.payload,
      isFetching: action.isFetching,
    };
  case REQUEST_API_GAME_ERROR:
    return {
      ...state,
      isFetching: action.isFetching,
      error: action.error,
    };
  default:
    return state;
  }
};

export default gameReducer;
