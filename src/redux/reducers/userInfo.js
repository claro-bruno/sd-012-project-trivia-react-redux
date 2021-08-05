import { USERINFOS } from '../actions/index';

const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
  },
};

const userInfosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USERINFOS:
    return { ...state, name: action.name, emial: action.email };
  default: return state;
  }
};

export default userInfosReducer;
