export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS, payload,
});

export const getTokenError = () => ({
  type: GET_TOKEN_ERROR,
});

export const fetchClick = () => (dispatch) => {
  dispatch(getToken());
  const API = 'https://opentdb.com/api_token.php?command=request';
  fetch(API)
    .then((response) => response.json())
    .then(({ token }) => dispatch(getTokenSuccess(token)));
};

export const ADD_NEW_PLAYER = (state) => ({
  type: 'ADD_NEW_PLAYER',
  state,
});
