import {
  REQUEST_API_GAME_LOADING,
  REQUEST_API_GAME_SUCCESS,
  REQUEST_API_GAME_ERROR,
  SCORE_UPDATE,
} from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: false,
  score: 0,
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
  case SCORE_UPDATE:
    return {
      ...state,
      score: (state.score + action.payload),
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default gameReducer;
