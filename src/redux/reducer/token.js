const INITIAL_STATE = ({
  response_code: 0,
  response_message: '',
  token: '',
});

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TOKEN':
    return {
      ...state,
      ...action,
    };
  default:
    return state;
  }
};

export default token;
