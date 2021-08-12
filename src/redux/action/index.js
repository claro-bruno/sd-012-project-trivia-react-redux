export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const GET_TOKEN_LOADING = 'GET_TOKEN_LOADING';
export const GET_QUESTION = 'GET_QUESTION';
export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';

const getQuestionError = (erro) => ({ type: GET_QUESTION_ERROR, payload: erro });
const getQuestion = () => ({ type: GET_QUESTION });
const getTokenLoading = () => ({ type: GET_TOKEN_LOADING });
const getTokenSuccess = (token) => ({ type: GET_TOKEN_SUCCESS, payload: token });
const getTokenError = (erro) => ({ type: GET_TOKEN_ERROR, payload: erro });

export const getLogin = (value) => ({
  type: 'LOGIN',
  ...value,
});

const getQuestionSuccess = (question) => ({
  type: GET_QUESTION_SUCCESS,
  payload: question,
});

export const getAllQuestions = (token) => async (dispatch) => {
  dispatch(getQuestion());
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const responseJson = await response.json();
  try {
    dispatch(getQuestionSuccess(responseJson.results));
  } catch (erro) {
    dispatch(getQuestionError(erro));
  }
};

export const getToken = () => async (dispatch) => {
  dispatch(getTokenLoading());
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const token = await response.json();
  try {
    dispatch(getTokenSuccess(token));
    localStorage.setItem('token', token.token);
    dispatch(getAllQuestions(token.token));
  } catch (err) {
    dispatch(getTokenError(err));
  }
};

export const SET_SCORE = 'SET_SCORE';
export const setScore = (score, assertions) => ({
  type: SET_SCORE,
  payload: score,
  value: assertions,
});

export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';
export const clearQuestions = () => ({
  type: CLEAR_QUESTIONS,
});
