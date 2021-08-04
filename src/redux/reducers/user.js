const INITIAL_STATE = {
  token: '',
  isFetchingToken: false,
  tokenError: {},
  email: '',
  name: '',
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
  default: return state;
  }
}

export default user;
