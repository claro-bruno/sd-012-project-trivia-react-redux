// import fetchApiGame from '../../services/fetchApiGame';

const mockfetchApiGame = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the first weapon you acquire in Half-Life?',
      correct_answer: 'A crowbar',
      incorrect_answers: [
        'A pistol',
        'The H.E.V suit',
        'Your fists',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'hard',
      question: 'TF2: Sentry rocket damage falloff is calculated',
      correct_answer: 'False',
      incorrect_answers: [
        'True',
      ],
    },
  ],
};

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
  payload: data.results,
});

export const actionRequestApiGameError = (error) => ({
  type: REQUEST_API_GAME_ERROR,
  isFetching: false,
  error,
});

export const actionFetchApiGame = () => async (dispatch) => {
  dispatch(actionRequestApiGame());
  try {
    // const fetchApi = await fetchApiGame();
    const fetchApi = await mockfetchApiGame;
    await dispatch(actionRequestApiGameSuccess(fetchApi));
  } catch (error) {
    console.log(error);
    await dispatch(actionRequestApiGameError(error));
  }
};
