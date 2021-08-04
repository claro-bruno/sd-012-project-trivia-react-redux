export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const loginAction = (name, gravatarEmail) => ({
  type: LOGIN_ACTION,
  name,
  gravatarEmail,
});

export const requestToken = (tokenData) => ({
  type: REQUEST_TOKEN,
  ...tokenData,
});

export function getTokenThunk() {
  return async (dispatch) => {
    try {
      const fetchToken = await fetch(
        'https://opentdb.com/api_token.php?command=request',
      );
      const response = await fetchToken.json();
      localStorage.setItem('token', JSON.stringify(response.token));
      return dispatch(requestToken(response));
    } catch (error) {
      return dispatch(requestToken(error));
    }
  };
}
