export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const ERROR_TOKEN = 'ERROR_TOKEN';

export const loginAction = (name, email) => ({
  type: LOGIN_ACTION,
  name,
  email,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveToken = (data) => ({
  type: RECEIVE_TOKEN,
  data,
});

export const errorToken = () => ({
  type: ERROR_TOKEN,
});
