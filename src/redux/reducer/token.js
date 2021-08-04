const INITIAL_STATE = {
  result: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_TOKEN':
    return { result: action.token };
  default:
    return state;
  }
};

export default token;
