import { saveScore, setScore } from '../../data/helpers';

const INITIAL_STATE = {
  token: '',
  isFetchingToken: false,
  tokenError: {},
  name: '',
  email: '',
  score: 0,
  assertions: 0,
  minScore: 10,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_PROFILE':
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  case 'SEND_REQUEST':
    return {
      ...state,
      isFetchingToken: true,
    };
  case 'GET_RESPONSE':
    localStorage.setItem('token', action.response.token);
    return {
      ...state,
      token: action.response.token,
      isFetchingToken: false,
    };
  case 'GET_ERROR':
    return {
      ...state,
      tokenError: { ...action.error },
      isFetchingToken: false,
    };
  case 'UPDATE_SCORE':
    localStorage.setItem('state', JSON.stringify(saveScore(state, action)));
    return setScore(state, action);
  default: return state;
  }
}

export default user;
