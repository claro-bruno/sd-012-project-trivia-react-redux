export const AWAIT_TRIVIA = 'AWAIT_TRIVIA';
export const GET_TRIVIA = 'GET_TRIVIA';
const URL_TRIVIA_API = 'https://opentdb.com/api.php?amount=5&token=';

const awaitTriviaFetch = () => ({
  type: AWAIT_TRIVIA,
});

const getTrivia = (payload) => ({
  type: GET_TRIVIA,
  response: payload.response_code,
  questions: payload.results,
});

export function requestTrivia() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    dispatch(awaitTriviaFetch());
    return fetch(URL_TRIVIA_API + token)
      .then((r) => r.json())
      .then((json) => dispatch(getTrivia(json)));
  };
}
