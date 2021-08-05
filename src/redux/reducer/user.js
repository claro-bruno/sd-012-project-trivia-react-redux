import { NAME_SET, EMAIL_SET } from '../actions/index';

const initialState = {
  name: '',
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case NAME_SET:
    return {
      ...state,
      name: action.payload,
    };
  case EMAIL_SET:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default user;
