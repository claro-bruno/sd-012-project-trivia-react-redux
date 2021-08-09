import fetchApiGame from '../../services/fetchApiGame';

export const REQUEST_API_GAME_LOADING = 'REQUEST_API_GAME';
export const REQUEST_API_GAME_SUCCESS = 'REQUEST_API_GAME_SUCCESS';
export const REQUEST_API_GAME_ERROR = 'REQUEST_API_GAME_ERROR';
export const SCORE_UPDATE = 'SCORE_UPDATE';

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
export const ACTION_SHOW_ANSWERS = 'ACTION_SHOW_ANSWERS';

export const showAnswers = (show) => ({ type: ACTION_SHOW_ANSWERS, show });

export const dispatchScore = (score) => ({
  type: SCORE_UPDATE,
  payload: score,
});
