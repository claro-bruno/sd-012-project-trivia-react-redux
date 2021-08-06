const initialState = {
  name: '',
  email: '',
  assertions: 0,
  score: 0,
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_NEW_PLAYER':
    return (action.state);
  case 'GET_SCORE':
    return { ...state,
      score: action.value.score,
      assertions: action.value.questionsRight };
  default:
    return (state);
  }
};

export default player;
