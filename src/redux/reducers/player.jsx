const initialState = {
  name: '',
  email: '',
  score: 0,
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_NEW_PLAYER':
    return (action.state);
  default:
    return (state);
  }
};

export default player;
