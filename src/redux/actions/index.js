export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_USERNAME = 'ADD_USERNAME';
export const ADD_TOKEN = 'ADD_TOKEN';

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
