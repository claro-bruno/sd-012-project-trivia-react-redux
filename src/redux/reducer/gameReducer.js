const INITIAL_STATE = {
  questions: {},
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_QUESTIONS_SUCCESS':
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
