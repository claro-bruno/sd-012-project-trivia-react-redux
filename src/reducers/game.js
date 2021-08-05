import {
  FETCH_API_GAME,
  FETCH_API_GAME_SUCCESS,
  FETCH_API_GAME_ERROR,
} from '../actions';

const INITIAL_STATE = {
  gameDataApi: {},
  isFetching: false,
};

function requestGameApi(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API_GAME:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_API_GAME_SUCCESS:
    return {
      ...state,
      isFetching: false,
      gameDataApi: action.payload,
    };
  case FETCH_API_GAME_ERROR:
    return {
      ...state,
      isFetching: false,
      gameDataApi: Error,
    };
  default:
    return state;
  }
}

export default requestGameApi;
