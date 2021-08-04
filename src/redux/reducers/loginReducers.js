import { USER_PLAYER } from '../actions/actionsTypes';

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
  default:
    return state;
  }
};

export default loginReducers;
