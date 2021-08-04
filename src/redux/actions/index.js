import { GET_TOKEN_SUCCESS, GET_TOKEN, GET_TOKEN_ERROR } from './actionTypes';

export const userAction = (payload) => ({ type: 'USER_ACTION', payload });

export const getToken = () => ({ type: GET_TOKEN });

export const getTokenSuccess = (token) => ({ type: GET_TOKEN_SUCCESS, token });

export const getTokenError = (error) => ({ type: GET_TOKEN_ERROR, error });

export const fetchToken = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseJson = await response.json();
    const tokenAPI = responseJson.token;
    localStorage.setItem('token', JSON.stringify(tokenAPI));
    dispatch(getTokenSuccess(tokenAPI));
  } catch (error) {
    dispatch(getTokenError(error));
  }
};
