import { ADD_EMAIL, ADD_USERNAME } from '../actions';

const INITIAL_STATE = ({
  email: '',
  nome: '',
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
  default: return state;
  }
};

export default userInfo;
