const GET_TIMER = 'GET_TIMER';

const INITIAL_STATE = {
  time: '',
  disabled: '',
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TIMER:
    return {
      time: action.time,
      disabled: action.disabled,
      activeButton: action.activeButton,
    };
  default:
    return state;
  }
};

export default timer;
