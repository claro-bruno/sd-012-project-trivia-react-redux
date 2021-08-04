export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';

export const fetchToken = (payload) => ({ type: GET_TOKEN, payload });

export const fetchTokenSuccess = (payload) => ({ type: GET_TOKEN_SUCCESS, payload });

export const fetchTokenError = (err) => ({ type: GET_TOKEN_ERROR, err });

export const fetchApiToken = () => (dispatch) => {
  dispatch(fetchToken());

  const endpoint = 'https://opentdb.com/api_token.php?command=request';

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchTokenSuccess(data));
      localStorage.setItem('token', JSON.stringify(data.token));
    })
    .catch((error) => dispatch(fetchTokenError(error)));
};

export const GET_PLAYER_USER_INFO = 'GET_PLAYER_NAME';

export const playerUserInfo = (payload) => ({ type: GET_PLAYER_USER_INFO, payload });
