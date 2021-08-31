import md5 from 'crypto-js/md5';
import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatar: '',
};

const getGravatar = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_USER:
    return {
      ...state,
      name: payload.name,
      email: payload.email,
      gravatar: getGravatar(payload.email),
    };
  default:
    return state;
  }
};

export default playerReducer;
