import { LOGIN_ACTION } from '../actions';

const INITIAL_STATE = {
  player: {
    playerName: '',
    playerEmail: '',
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
  default:
    return state;
  }
};

export default PlayerReducer;
