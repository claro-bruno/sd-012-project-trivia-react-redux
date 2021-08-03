export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestTokenSuccess = (value) => ({
  type: REQUEST_TOKEN_SUCCESS, payload: value,
});

export const requestTokenError = (error) => ({
  type: REQUEST_TOKEN_ERROR, payload: error,
});

const END_POINT = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken());
  return fetch(END_POINT)
    .then((response) => response.json())
    .then((result) => {
      dispatch(requestTokenSuccess(result));
    })
    .catch((error) => dispatch(requestTokenError(error)));
};

export const USERINFOS = 'USERINFOS';
export const actionUserInfo = (user) => ({ type: USERINFOS, user });
