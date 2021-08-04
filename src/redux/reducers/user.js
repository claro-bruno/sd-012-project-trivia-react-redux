import { GET_USER_DATA } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_DATA:
    return {
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
