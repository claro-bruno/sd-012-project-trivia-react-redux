export const SAVE_USER = 'SAVE_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsError = (payload) => ({
  type: GET_QUESTIONS_ERROR,
  payload,
});

export const fetchQuestions = (token) => (dispatch) => {
  dispatch(getQuestions());
  return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then(
      (data) => {
        dispatch(getQuestionsSuccess(data.results));
      },
      (error) => dispatch(getQuestionsError(error)),
    );
};
