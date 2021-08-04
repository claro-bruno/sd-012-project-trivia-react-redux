import { SEND_USER_INFO } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_INFO:
    return {
      ...state,
      name: action.name,
      email: action.email,
      image: action.image,
    };
  default:
    return state;
  }
};

export default user;
