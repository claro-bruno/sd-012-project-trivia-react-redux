export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_USERNAME = 'ADD_USERNAME';
export const ADD_TOKEN = 'ADD_TOKEN';
export const IS_OVER = 'IS_OVER';
export const PASS_TIME = 'PASS_TIME';
export const TIME_RESET = 'TIME_RESET';

export const addEmail = (userEmail) => ({
  type: ADD_EMAIL,
  payload: userEmail,
});

export const addUserName = (userName) => ({
  type: ADD_USERNAME,
  payload: userName,
});

export const addToken = (token) => ({
  type: ADD_TOKEN,
  payload: token,
});

export const isOver = () => ({
  type: IS_OVER,
  payload: true,
});

export const timePass = () => ({
  type: PASS_TIME,
});

export const timeReset = () => ({
  type: TIME_RESET,
});
