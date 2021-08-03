import { GET_QUESTIONS, GET_QUESTIONS_SUCCESS } from './actionsType';

export const getQuestions = () => ({ type: GET_QUESTIONS });

export function getQuestionsSuccess(questions) {
  return { type: GET_QUESTIONS_SUCCESS, payload: questions };
}

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(getQuestions());
  const responseToken = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await responseToken.json();
  dispatch(getQuestionsSuccess(results));
};
