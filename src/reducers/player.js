const CREATE_LOGIN = 'CREATE_LOGIN';
const CHANGE_SCORE = 'CHANGE_SCORE';
const CHANGE_ASSERTIONS = 'CHANGE_ASSERTIONS';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  score: 0,
  assertions: 0,
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_LOGIN:
    return { ...state,
      user: {
        name: action.payload.name,
        email: action.payload.email,
      } };

  case CHANGE_SCORE:
    return { ...state, score: action.payload };
  case CHANGE_ASSERTIONS:
    return { ...state, assertions: action.payload };
  default:
    return state;
  }
};

export default player;
