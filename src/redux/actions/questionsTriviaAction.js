export const GET_API_TRIVIA_QUESTIONS = 'GET_API_TRIVIA_QUESTIONS';
export const GET_API_TRIVIA_QUESTIONS_SUCESS = 'GET_API_TRIVIA_QUESTIONS_SUCESS';
export const GET_API_TRIVIA_QUESTIONS_ERROR = 'GET_API_TRIVIA_QUESTIONS_ERROR';

export const getQuestions = () => ({
  type: GET_API_TRIVIA_QUESTIONS,
});

export const getQuestionsSucess = (questions) => ({
  type: GET_API_TRIVIA_QUESTIONS_SUCESS,
  payload: questions,
});

export const getQuestionsError = (error) => ({
  type: GET_API_TRIVIA_QUESTIONS_ERROR,
  payload: error,
});

export const questionsFetchAPI = (token) => async (dispatch) => {
  dispatch(getQuestions());
  const END_POINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  fetch(END_POINT)
    .then((data) => data.json())
    .then((results) => dispatch(getQuestionsSucess(results)))
    .catch((error) => dispatch(getQuestionsError(error)));
};
