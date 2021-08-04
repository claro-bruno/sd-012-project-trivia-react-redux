const INITIAL_STATE = {
  result: [],
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_QUESTION':
    return { result: [...action.value] };
  default:
    return state;
  }
};

export default trivia;
