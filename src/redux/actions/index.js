import {
  USER_ACTION,
  USER_ACTION_NAME,
  USER_ACTION_HASH,
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
} from './actionTypes';

export const userAction = (payload) => ({ type: USER_ACTION, payload });

export const userActionName = (payload) => ({ type: USER_ACTION_NAME, payload });

export const userHashEmail = (payload) => ({ type: USER_ACTION_HASH, payload });

export const getToken = () => ({ type: GET_TOKEN });

export const getTokenSuccess = (token) => ({ type: GET_TOKEN_SUCCESS, token });

export const getTokenError = (error) => ({ type: GET_TOKEN_ERROR, error });

export const getQuestions = () => ({ type: GET_QUESTIONS });

export const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS, payload,
});

export const getQuestionsError = (error) => ({ type: GET_QUESTIONS_ERROR, error });

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

export const fetchApi = (token) => async (dispatch) => {
  dispatch(getQuestions());
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();
    const responseResults = await responseJson.results;
    dispatch(getQuestionsSuccess(responseResults));
  } catch (error) {
    dispatch(getTokenError(error));
  }
};

// localStorage.setItem('token', JSON.stringify(tokenAPI));
