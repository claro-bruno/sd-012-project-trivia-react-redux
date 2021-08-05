export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVED_TOKEN = 'RECEIVED_TOKEN';
export const FAILED_TOKEN = 'FAILED_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS';
export const FAILED_QUESTIONS = 'FAILED_QUESTIONS';

export const loginAction = (name, gravatarEmail) => ({
  type: LOGIN_ACTION,
  name,
  gravatarEmail,
});

// --------------------------------------------------------------
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

// --------------------------------------------------------------
export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const receivedQuestions = (questionsData) => ({
  type: RECEIVED_QUESTIONS,
  questionsData,
});

export const failedQuestions = () => ({
  type: FAILED_QUESTIONS,
});

// export const receivedQuestions = (questionsData) => ({});

// função abaixo foi desenvolvida com base na sugestão de Rodrigo Merlone (que o mesmo postou no Slack no #sd-12)
export function getTokenAndQuestionsThunk() {
  return async (dispatch) => {
    try {
      const fetchToken = await fetch(
        'https://opentdb.com/api_token.php?command=request',
      );
      dispatch(requestToken());
      const response = await fetchToken.json();
      localStorage.setItem('token', JSON.stringify(response.token));
      dispatch(receivedToken(response.token));
      try {
        const fetchQuestions = await fetch(
          `https://opentdb.com/api.php?amount=5&token=${response.token}`,
        );
        dispatch(requestQuestions());
        const questions = await fetchQuestions.json();
        dispatch(receivedQuestions(questions));
      } catch (error) {
        dispatch(failedQuestions());
      }
    } catch (error) {
      dispatch(failedToken());
    }
  };
}
// --------------------------------------------------------------

// export function getQuestionsThunk() {
//   return async (dispatch) => {
//     try {
//       const tokenStorage = localStorage.getItem('token');
//       const fetchQuestions = await fetch(
//         `https://opentdb.com/api.php?amount=5&token=${tokenStorage}`,
//       );
//       const response = await fetchQuestions.json();
//       return dispatch(requestQuestions(response));
//     } catch (error) {
//       return dispatch(requestQuestions(error));
//     }
//   };
// }
