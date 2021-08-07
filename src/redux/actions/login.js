export const SAVE_LOGIN = 'SAVE_LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_PICTURE = 'SAVE_PICTURE';

export const saveLogin = (name, email) => ({
  type: SAVE_LOGIN,
  name,
  email,
});

export const getToken = (response) => ({
  type: GET_TOKEN,
  response,
});

export const savePicture = (url) => ({
  type: SAVE_PICTURE,
  url,
});

export const fetchTrivia = () => async (dispatch) => {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await request.json();
    await dispatch(getToken(response.token));
  } catch (error) {
    dispatch(getToken('erro'));
  }
};
