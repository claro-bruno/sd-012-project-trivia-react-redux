import { ADD_EMAIL, ADD_TOKEN, ADD_USERNAME, IS_OVER } from '../actions';

const INITIAL_STATE = ({
  email: '',
  name: '',
  token: '',
  over: false,
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
  case IS_OVER:
    return {
      ...state,
      over: action.payload,
    };
  default: return state;
  }
};

export default userInfo;
