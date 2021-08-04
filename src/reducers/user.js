const GET_EMAIL = 'GET_EMAIL';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return {
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
