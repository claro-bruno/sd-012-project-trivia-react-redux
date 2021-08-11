import { fetchToken, fetchQuiz } from '../../services/fetch';
import shuffleArray from '../../utils';

export const NAME_SET = 'USER_SET';
export const EMAIL_SET = 'EMAIL_SET';
export const TOKEN_START = 'TOKEN_START';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const QUIZ_START = 'QUIZ_START';
export const QUIZ_SUCCESS = 'QUIZ_SUCCESS';

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

const quizStart = () => ({
  type: QUIZ_START,
  payload: { fetch: true },
});

const quizSuccess = (results) => ({
  type: QUIZ_SUCCESS,
  payload: { fetch: false, results },
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

export const getQuiz = () => async (dispatch) => {
  dispatch(quizStart());
  try {
    let results = await fetchQuiz();
    results = results.map((result) => {
      const {
        correct_answer: correct,
        incorrect_answers: incorrect = [] } = result;
      const sortedArray = [correct, ...incorrect];
      const newArray = shuffleArray(sortedArray);
      const newResult = { ...result, sortedArray: newArray };
      return newResult;
    });
    dispatch(quizSuccess(results));
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};
