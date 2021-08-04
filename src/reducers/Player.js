import { LOGIN_ACTION, REQUEST_TOKEN, RECEIVE_TOKEN, ERROR_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: {
    playerName: '',
    playerEmail: '',
    token: '',
    isLoading: false,
    error: false,
  },
};

const PlayerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      player: {
        playerName: '',
        playerEmail: '',
      },
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case RECEIVE_TOKEN:
    return {
      ...state,
      data: action.data,
    };
  case ERROR_TOKEN:
    return {
      ...state,
      error: true,
    };
  default:
    return state;
  }
};

export default PlayerReducer;
