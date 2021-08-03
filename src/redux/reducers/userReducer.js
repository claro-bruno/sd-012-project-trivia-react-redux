import USER_ACTION from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  ranking: '',
  token: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_ACTION:
    if (action.payload === 'name') {
      return ({ ...state, name: action.value });
    }
    return ({ ...state, email: action.value });
  default:
    return state;
  }
}

export default user;
