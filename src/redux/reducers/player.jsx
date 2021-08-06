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
  case 'SET_STORAGE': {
    const obj = { player: action.player };
    localStorage.setItem('state', JSON.stringify(obj));
    return (state);
  }
  default:
    return (state);
  }
};

export default player;
