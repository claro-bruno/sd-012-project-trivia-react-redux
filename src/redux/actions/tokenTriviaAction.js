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

const fetchToken = async () => {
  const END_POINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(END_POINT);
  const { token } = await response.json();
  return token;
};

export const tokenFetchAPI = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const fetchAPIToken = await fetchToken();
    await dispatch(getTokenSucess(fetchAPIToken));
  } catch (error) {
    await dispatch(getTokenError(error));
  }
};
