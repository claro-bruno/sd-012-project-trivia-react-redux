import { ADD_EMAIL, ADD_TOKEN, ADD_USERNAME } from '../actions';

const INITIAL_STATE = ({
  email: '',
  name: '',
  token: '',
});

const userInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case ADD_USERNAME:
    return {
      ...state,
      name: action.payload,
    };
  case ADD_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default: return state;
  }
};

export default userInfo;
