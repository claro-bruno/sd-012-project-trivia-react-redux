import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS, GET_NAME } from './actionsType';

export const getQuestions = () => ({ type: GET_QUESTIONS });

export function getQuestionsSuccess(questions) {
  return { type: GET_QUESTIONS_SUCCESS, payload: questions };
}

export const getName = (state) => ({ type: GET_NAME, ...state });

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(getQuestions());
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();
  dispatch(getQuestionsSuccess(results));
};
