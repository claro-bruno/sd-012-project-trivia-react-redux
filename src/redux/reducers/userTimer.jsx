import { PLAYER_TIMER } from '../actions';

const INITIAL_STATE = {
  timing: false,
};

const userTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_TIMER:
    return { timing: action.value,
    };
  default:
    return state;
  }
};

export default userTimer;
