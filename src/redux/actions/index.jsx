import fetchApiGame from '../../services/fetchApiGame';

// const mockfetchApiGame = {
//   response_code: 0,
//   results: [
//     {
//       category: 'Entertainment: Video Games',
//       type: 'multiple',
//       difficulty: 'easy',
//       question: 'What is the first weapon you acquire in Half-Life?',
//       correct_answer: 'A crowbar',
//       incorrect_answers: [
//         'A pistol',
//         'The H.E.V suit',
//         'Your fists',
//       ],
//     },
//     {
//       category: 'Entertainment: Video Games',
//       type: 'boolean',
//       difficulty: 'hard',
//       question: 'TF2: Sentry rocket damage falloff is calculated',
//       correct_answer: 'False',
//       incorrect_answers: [
//         'True',
//       ],
//     },
//   ],
// };

export const REQUEST_API_GAME_LOADING = 'REQUEST_API_GAME';
export const REQUEST_API_GAME_SUCCESS = 'REQUEST_API_GAME_SUCCESS';
export const REQUEST_API_GAME_ERROR = 'REQUEST_API_GAME_ERROR';

export const actionRequestApiLoading = () => ({
  type: REQUEST_API_GAME_LOADING,
  isFetching: true,
});

export const actionRequestApiGameSuccess = (data) => ({
  type: REQUEST_API_GAME_SUCCESS,
  isFetching: false,
  payload: data,
});

export const actionRequestApiGameError = (error) => ({
  type: REQUEST_API_GAME_ERROR,
  isFetching: false,
  error,
});

export const actionFetchApiGame = (token) => async (dispatch) => {
  dispatch(actionRequestApiLoading());
  try {
    const fetchApi = await fetchApiGame(token);
    // const fetchApi = await mockfetchApiGame;
    await dispatch(actionRequestApiGameSuccess(fetchApi));
  } catch (error) {
    console.log(error);
    await dispatch(actionRequestApiGameError(error));
  }
};

export const ACTION_LOGIN = 'ACTION_LOGIN';

export const actionLogin = (nome, email, token) => ({
  type: ACTION_LOGIN,
  nome,
  email,
  token,
});

export function fetchLoginAction(nome, email) {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then(({ token }) => {
      localStorage.token = token;
      return dispatch(actionLogin(nome, email, token));
    })
    .catch(console.error);
}
