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
    return { ...state, user: action.user };
  default: return state;
  }
};

export default userInfosReducer;
