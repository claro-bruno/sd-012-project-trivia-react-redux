import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS } from './actionsType';

export const getToken = () => ({ type: GET_TOKEN });

export function getTokenSuccess(token) {
  return { type: GET_TOKEN_SUCCESS, payload: token };
}

export const getQuestions = () => ({ type: GET_QUESTIONS });

export function getQuestionsSuccess(questions) {
  return { type: GET_QUESTIONS_SUCCESS, payload: questions };
}

export const fetchToken = () => async (dispatch) => {
  dispatch(getToken());
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await response.json();
  dispatch(getTokenSuccess(token));
};

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(getQuestions());
  const responseToken = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await responseToken.json();
  dispatch(getQuestionsSuccess(results));
};
