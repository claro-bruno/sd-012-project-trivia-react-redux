const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const updateProfile = (name, email) => ({
  type: 'UPDATE_PROFILE',
  email,
  name,
});

const sendRequest = () => ({
  type: 'SEND_REQUEST',
});

const getResponse = (response) => ({
  type: 'GET_RESPONSE',
  response,
});

const getError = (error) => ({
  type: 'GET_ERROR',
  error,
});

export const fetchToken = () => (dispatch) => {
  dispatch(sendRequest());
  fetch(tokenURL)
    .then((response) => response.json())
    .then((json) => dispatch(getResponse(json)))
    .catch((error) => dispatch(getError(error)));
};

const sendQuestionsRequest = () => ({
  type: 'SEND_QUESTIONS_REQUEST',
});

const getQuestions = (response) => ({
  type: 'GET_QUESTIONS',
  response,
});

const getQuestionsError = (error) => ({
  type: 'GET_QUESTIONS_ERROR',
  error,
});

export const fetchQuestions = (token) => (dispatch) => {
  dispatch(sendQuestionsRequest());
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((json) => dispatch(getQuestions(json)))
    .catch((error) => dispatch(getQuestionsError(error)));
};

export const nextQuestion = () => ({
  type: 'NEXT_QUESTION',
});

export const timerCallbacks = (startTimerCallback, stopTimerCallback) => ({
  type: 'TIMER_CALLBACKS',
  startTimerCallback,
  stopTimerCallback,
});

export const remainingTimeAction = (remainingTime) => ({
  type: 'REMAINING_TIME',
  remainingTime,
});

export const isOutOfTimeAction = () => ({
  type: 'IS_OUT_OF_TIME',
});

export const isQuestionAnsweredAction = () => ({
  type: 'IS_QUESTION_ANSWERED',
});

export const isAnsweringAction = () => ({
  type: 'IS_ANSWERING',
});
