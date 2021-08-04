export const GET_API_TRIVIA_TOKEN = 'GET_API_TRIVIA_TOKEN';
export const GET_API_TRIVIA_TOKEN_SUCESS = 'GET_API_TRIVIA_TOKEN_SUCESS';
export const GET_API_TRIVIA_TOKEN_ERROR = 'GET_API_TRIVIA_TOKEN_ERROR';

export const getToken = () => ({
  type: GET_API_TRIVIA_TOKEN,
});

export const getTokenSucess = (token) => ({
  type: GET_API_TRIVIA_TOKEN_SUCESS,
  payload: token,
});

export const getTokenError = (error) => ({
  type: GET_API_TRIVIA_TOKEN_ERROR,
  payload: error,
});

export const tokenFetchAPI = () => async (dispatch) => {
  dispatch(getToken());
  const END_POINT = 'https://opentdb.com/api_token.php?command=request';
  fetch(END_POINT)
    .then((data) => data.json())
    .then((results) => dispatch(getTokenSucess(results)))
    .catch((error) => dispatch(getTokenError(error)));
};
