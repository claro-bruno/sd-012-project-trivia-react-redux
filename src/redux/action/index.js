const URL_TRIVIA_API = 'https://opentdb.com/api.php?';
export const SEND_USER_INFO = 'SEND_USER_INFO';
export const AWAIT_TRIVIA = 'AWAIT_TRIVIA';
export const GET_TRIVIA = 'GET_TRIVIA';
export const ERR_TRIVIA = 'ERR_TRIVIA';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_RIGHT_QUESTIONS = 'UPDATE_RIGHT_QUESTIONS';
export const TIMER_ACTION = 'TIMER_ACTION';
export const TIMER_RESTART_CHANGE = 'TIMER_RESTART_CHANGE';
export const RESTORE_STORE = 'RESTORE_STORE';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export const sendUserInfo = (name, email, image) => ({
  type: SEND_USER_INFO, name, email, image,
});

const awaitTriviaFetch = () => ({
  type: AWAIT_TRIVIA,
});

const getTrivia = (payload) => ({
  type: GET_TRIVIA,
  response: payload.response_code,
  questions: payload.results,
});

const errTrivia = (err) => ({
  type: ERR_TRIVIA,
  err,
});

export function requestTrivia({ amount, category, difficulty, type }) {
  const token = localStorage.getItem('token');
  const amountURL = `amount=${amount}`;
  const tokenURL = `&token=${token}`;
  const categoryURL = category === 'any' ? '' : `&category=${category}`;
  const difficultyURL = difficulty === 'any' ? '' : `&difficulty=${difficulty}`;
  const typeURL = type === 'any' ? '' : `&type=${type}`;
  console.log(`${URL_TRIVIA_API}${amountURL}${tokenURL}`
  + `${categoryURL}${difficultyURL}${typeURL}`);
  return (dispatch) => {
    dispatch(awaitTriviaFetch());
    return (
      fetch(`${URL_TRIVIA_API}${amountURL}${tokenURL}`
      + `${categoryURL}${difficultyURL}${typeURL}`)
        .then((r) => r.json())
        .then((json) => dispatch(getTrivia(json)))
        .catch((err) => dispatch(errTrivia(err)))
    );
  };
}

export const updateScore = (score) => ({
  type: UPDATE_SCORE, score,
});

export const timerAction = (time) => ({
  type: TIMER_ACTION, time,
});

export const timerRestartChange = () => ({
  type: TIMER_RESTART_CHANGE,
});

export const restoreStore = () => ({
  type: RESTORE_STORE,
});

export const changeSettings = (settings) => ({
  type: CHANGE_SETTINGS, settings,
});
