// eslint-disable-next-line import/no-named-as-default
import TOKEN from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
    token: '',
  },
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}
