export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestTokenSuccess = (value) => ({
  type: REQUEST_TOKEN_SUCCESS, payload: value,
});

export const requestTokenError = (error) => ({
  type: REQUEST_TOKEN_ERROR, payload: error,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const requestQuestionsSuccess = (value) => ({
  type: REQUEST_QUESTIONS_SUCCESS, payload: value,
});

export const requestQuestionsError = (error) => ({
  type: REQUEST_QUESTIONS_ERROR, payload: error,
});

const END_POINT = 'https://opentdb.com/api_token.php?command=request';

// Solução proposta pelo Rodrigo Merlone - Turma 12
export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const tokenRequest = await fetch(END_POINT);
    const tokeJSON = await tokenRequest.json();
    dispatch(requestTokenSuccess(tokeJSON.token));
    localStorage.setItem('token', tokeJSON.token);
    const QUESTION_URL = `https://opentdb.com/api.php?amount=5&token=${tokeJSON.token}`;
    try {
      const questionsRequest = await fetch(QUESTION_URL);
      const questionsJSON = await questionsRequest.json();
      dispatch(requestQuestionsSuccess(questionsJSON.results));
    } catch (e) {
      dispatch(requestQuestionsError(e));
    }
  } catch (e) {
    dispatch(requestTokenError(e));
  }
};

export const fetchAnswers = (token, qty) => (dispatch) => {
  dispatch(requestQuestions());
  return fetch(`https://opentdb.com/api.php?amount=${qty}&token=${token}`)
    .then((response) => response.json())
    .then((result) => {
      dispatch(requestQuestionsSuccess(result.results));
      console.log('Result', result);
    })
    .catch((error) => dispatch(requestQuestionsError(error)));
};

export const USERINFOS = 'USERINFOS';
export const actionUserInfo = (name, email) => ({ type: USERINFOS, name, email });
