const INITIAL_STATE = ({
  email: '',
  name: '',
});

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};

export default user;
