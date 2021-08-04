import { GET_NAME } from '../actions';

const INITIAL_STATE = {
  user: '',
};

const nameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_NAME:
    return {
      user: action.payload,
    };
  default:
    return state;
  }
};

export default nameReducer;
