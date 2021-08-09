import { RESET_PLAYER, USER_PLAYER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  playerInfo: {
    email: '',
    name: '',
  },
};

const loginReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_PLAYER:
    return {
      ...state,
      playerInfo: action.loginInfo,
    };
  case RESET_PLAYER:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default loginReducers;
