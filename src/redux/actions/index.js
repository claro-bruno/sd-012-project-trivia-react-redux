import fetchToken from '../../services/fetch';

export const NAME_SET = 'USER_SET';
export const EMAIL_SET = 'EMAIL_SET';
export const TOKEN_START = 'TOKEN_START';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';

export const nameSet = (payload) => ({
  type: NAME_SET,
  payload,
});

export const emailSet = (payload) => ({
  type: EMAIL_SET,
  payload,
});

const tokenStart = () => ({
  type: TOKEN_START,
  payload: { fetch: true },
});

const tokenSuccess = (token) => ({
  type: TOKEN_SUCCESS,
  payload: { fetch: false, token },
});

export const getToken = () => async (dispatch) => {
  dispatch(tokenStart());
  try {
    const token = await fetchToken();
    dispatch(tokenSuccess(token));
    localStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
};
