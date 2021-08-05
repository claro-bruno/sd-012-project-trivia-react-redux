export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';
export const FAILED_TOKEN = 'FAILED_TOKEN';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
// export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
// export const FAILED_QUESTIONS = 'FAILED_QUESTIONS';

export const loginAction = (name, gravatarEmail) => ({
  type: LOGIN_ACTION,
  name,
  gravatarEmail,
});

// -------------------------------------------------------------
export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receivedToken = (tokenData) => ({
  type: RECEIVED_TOKEN,
  tokenData,
});

export const failedToken = () => ({
  type: FAILED_TOKEN,
});

export function getTokenThunk() {
  return async (dispatch) => {
    try {
      const fetchToken = await fetch(
        'https://opentdb.com/api_token.php?command=request',
      );
      const response = await fetchToken.json();
      localStorage.setItem('token', JSON.stringify(response.token));
      return dispatch(receivedToken(response.token));
    } catch (error) {
      return dispatch(failedToken());
    }
  };
}
// ---------------------------------------------------------

export const requestQuestions = (questionsData) => ({
  type: REQUEST_QUESTIONS,
  ...questionsData,
});

export function getQuestionsThunk() {
  return async (dispatch) => {
    try {
      const tokenStorage = localStorage.getItem('token');
      const fetchQuestions = await fetch(
        // 'https://opentdb.com/api.php?amount=5',
        `https://opentdb.com/api.php?amount=5&token=${tokenStorage}`,
      );
      const response = await fetchQuestions.json();
      return dispatch(requestQuestions(response));
    } catch (error) {
      return dispatch(requestQuestions(error));
    }
  };
}
