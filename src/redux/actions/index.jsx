import fetchApiGame from '../../services/fetchApiGame';

export const REQUEST_API_GAME_LOADING = 'REQUEST_API_GAME';
export const REQUEST_API_GAME_SUCCESS = 'REQUEST_API_GAME_SUCCESS';
export const REQUEST_API_GAME_ERROR = 'REQUEST_API_GAME_ERROR';

export const actionRequestApiGame = () => ({
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

export const actionFetchApiGame = () => async (dispatch) => {
  dispatch(actionRequestApiGame());
  try {
    const fetchApi = await fetchApiGame();
    dispatch(actionRequestApiGameSuccess(fetchApi));
  } catch (error) {
    console.log(error);
    dispatch(actionRequestApiGameError(error));
  }
};
