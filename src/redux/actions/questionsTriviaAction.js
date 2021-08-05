// TYPES PARAS AS ACTIONS QUESTIONS TRIVIA
export const GET_API_TRIVIA_QUESTIONS = 'GET_API_TRIVIA_QUESTIONS';
export const GET_API_TRIVIA_QUESTIONS_SUCESS = 'GET_API_TRIVIA_QUESTIONS_SUCESS';
export const GET_API_TRIVIA_ERRORS = 'GET_API_TRIVIA_ERRORS';

// ACTIONS QUESTIONS TRIVIA
export const getQuestions = () => ({
  type: GET_API_TRIVIA_QUESTIONS,
});

export const getQuestionsSucess = (questions, token) => ({
  type: GET_API_TRIVIA_QUESTIONS_SUCESS,
  payload: {
    questions,
    token },
});

export const getErrors = (errorQuestions, errorToken) => ({
  type: GET_API_TRIVIA_ERRORS,
  payload: { errorQuestions, errorToken },
});

export const questionsFetchAPI = () => async (dispatch) => {
  dispatch(getQuestions());
  const END_POINT_TOKEN = 'https://opentdb.com/api_token.php?command=request';

  try {
    const requestToken = await fetch(END_POINT_TOKEN);
    const responseToken = requestToken.json();
    const token = responseToken;

    localStorage.setItem('token', token);

    const END_POINT_QUESTION = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const requestQuestion = await fetch(END_POINT_QUESTION);
      const responseQuestion = requestQuestion.json();
      const questions = responseQuestion;
      dispatch(getQuestionsSucess(questions, token));
    } catch (error) {
      dispatch(getErrors(error, null));
    }
  } catch (error) {
    dispatch(getErrors(null, error));
  }
};
