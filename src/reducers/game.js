import { GET_PLAYER_USER_INFO } from '../actions';

const INITIAL_STATE = {
  player: {},
};

function playerGame(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_PLAYER_USER_INFO:
    return {
      ...state,
      player: { ...action.payload },
    };
  default:
    return state;
  }
}

export default playerGame;
