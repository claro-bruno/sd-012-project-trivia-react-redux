import {
  ADD_EMAIL,
  ADD_TOKEN,
  ADD_USERNAME,
  IS_OVER,
  PASS_TIME,
  TIME_RESET,
} from '../actions';

const INITIAL_STATE = ({
  email: '',
  name: '',
  token: '',
  over: false,
  time: 30,
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
  case PASS_TIME:
    return {
      ...state,
      time: state.time > 0 ? state.time - 1 : 0,
    };
  case TIME_RESET:
    return {
      ...state,
      time: 30,
      over: false,
    };
  default: return state;
  }
};

export default userInfo;
