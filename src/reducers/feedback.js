import { USER_PLAYER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  playerInfo: {
    email: '',
    name: '',
  },
};

const feedback = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_PLAYER:
    return {
      ...state,
      playerInfo: action.loginData, // => Req = 12 <=== Action.index.js
    };
  default:
    return state;
  }
};

export default feedback;
