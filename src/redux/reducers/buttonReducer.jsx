import { BUTTON_PLAY } from '../action/buttonAction';

const INITIAL_STATE = {
  token: '',
};

const button = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case BUTTON_PLAY:
    return {
      ...state,
      token: action.click,
    };
  default:
    return state;
  }
};

export default button;
