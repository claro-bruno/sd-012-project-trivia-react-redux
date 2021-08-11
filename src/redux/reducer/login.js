import { GET_PICTURE_URL, USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  pictureUrl: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return { ...state, name: action.name, email: action.email };
  case GET_PICTURE_URL:
    return {
      ...state,
      pictureUrl: action.payload,
    };
  default:
    return state;
  }
};

export default loginReducer;
