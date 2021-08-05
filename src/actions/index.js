export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const GET_PLAYER_USER_INFO = 'GET_PLAYER_USER_INFO';

export const playerUserInfo = (payload) => ({ type: GET_PLAYER_USER_INFO, payload });

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

export const FETCH_API_GAME = 'FETCH_API_GAME';

export const FETCH_API_GAME_SUCCESS = 'FETCH_API_GAME_SUCCESS';

export const FETCH_API_GAME_ERROR = 'FETCH_API_GAME_ERROR';

export const fetchGame = (payload) => ({
  type: FETCH_API_GAME,
  payload,
});

export const fetchGameSuccess = (payload) => ({
  type: FETCH_API_GAME_SUCCESS,
  payload,
});

export const fetchGameError = (payload) => ({
  type: FETCH_API_GAME_ERROR,
  payload,
});

export const fetchApiGame = () => (dispatch) => {
  const getTokenLocalStorage = JSON.parse(localStorage.getItem('token'));
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${getTokenLocalStorage}`;

  dispatch(fetchGame());

  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => dispatch(fetchGameSuccess(data)))
    .catch((error) => dispatch(fetchGameError(error)));
};
