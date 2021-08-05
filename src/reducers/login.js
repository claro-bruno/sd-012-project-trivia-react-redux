import { CREATE_LOGIN } from '../redux/actions';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
  },
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_LOGIN:
    return { email: action.payload.email, name: action.payload.name };
  default:
    return state;
  }
}
