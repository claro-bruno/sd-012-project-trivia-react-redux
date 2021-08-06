const GET_TIMER = 'GET_TIMER';

const INITIAL_STATE = {
  time: '',
  disable: '',
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TIMER:
    return {
      time: action.time,
      disable: action.disable,
    };
  default:
    return state;
  }
};

export default timer;
