export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const GET_TOKEN_LOADING = 'GET_TOKEN_LOADING';

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
  isLoading: false,
});

export const getTokenError = (error) => ({
  type: GET_TOKEN_ERROR, error,
});

export const getTokenLoading = () => ({
  type: GET_TOKEN_LOADING,
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(getToken());
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  fetch(endpoint)
    .then((data) => data.json())
    .then(({ token }) => dispatch(getTokenSuccess(token)))
    .catch((err) => dispatch(getTokenError(err)));
};
