const CHANGE_USER = 'CHANGE_USER';
const CHANGE_SCORE = 'CHANGE_SCORE';
const CHANGE_ASSERTIONS = 'CHANGE_ASSERTIONS';

const initial_state = {
  user: {
    name: '',
    email: '',
  },
  score: 0,
  assertions: 0,
};

const player = (state = initial_state, action) => {
  switch(action.type) {
    case CHANGE_USER:
      return { ...state, user: {
        name: action.payload.name,
        email: action.payload.email,
      }};
    case CHANGE_SCORE:
      return { ...state, score: action.payload };
    case CHANGE_ASSERTIONS:
      return { ...state, assertions: action.payload };
    default:
      return state;
  }
};

export default player;