const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const updateProfile = (name, email) => ({
  type: 'UPDATE_PROFILE',
  email,
  name,
});

const sendRequest = () => ({
  type: 'SEND_REQUEST',
});

const getResponse = (response) => ({
  type: 'GET_RESPONSE',
  response,
});

const getError = (error) => ({
  type: 'GET_ERROR',
  error,
});

export const fetchToken = () => (dispatch) => {
  dispatch(sendRequest());
  fetch(tokenURL)
    .then((response) => response.json())
    .then((json) => dispatch(getResponse(json)))
    .catch((error) => dispatch(getError(error)));
};
