import { GLOBAL_KEY } from '../actions/timer';

const INICIAL_STATE = {
  globalKey: false,
};

const timer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GLOBAL_KEY:
    return { ...state, globalKey: action.status };
  default:
    return state;
  }
};

export default timer;
