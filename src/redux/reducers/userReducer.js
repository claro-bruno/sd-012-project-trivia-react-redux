import {
  PLAYER_INFO,
} from '../actions';

const INTIAL_STATE = {
  name: '',
  email: '',
  avatar: '',
};

const userReducer = (state = INTIAL_STATE, { type, name, email, avatar }) => {
  switch (type) {
  case PLAYER_INFO:
    return { ...state, name, email, avatar };
  default:
    return state;
  }
};

export default userReducer;
