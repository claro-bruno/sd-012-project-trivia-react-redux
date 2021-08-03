import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    const newObj = { ...state };
    newObj[action.name] = action.value;
    return newObj;
  default:
    return state;
  }
};

export default loginReducer;
