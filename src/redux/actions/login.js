export const SAVE_LOGIN = 'SAVE_LOGIN';
export const LOADING = 'LOADING';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const saveLogin = (name, email) => ({
  type: SAVE_LOGIN,
  name,
  email,
});

export const loading = () => ({
  type: LOADING,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const getTokenError = (error) => ({
  type: GET_TOKEN_ERROR,
  payload: error,
});

export const fetchTrivia = () => async (dispatch) => {
  dispatch(loading());
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    await dispatch(getToken(response.token));
  } catch (error) {
    dispatch(getTokenError(error.message));
  }
};
