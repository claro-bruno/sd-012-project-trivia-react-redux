export const USER_INFO = 'USER_INFO';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const GET_PICTURE_URL = 'GET_PICTURE_URL';
export const RESET_GAME = 'RESET_GAME';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export const actionUserInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenFailed = (payload) => ({
  type: GET_TOKEN_FAILED,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  dispatch(getToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const results = await response.json();
    dispatch(getTokenSuccess(results.token));
  } catch (error) {
    dispatch(getTokenFailed(error));
  }
};

export const actionCorrectAnswer = (payload) => ({
  type: CORRECT_ANSWER,
  payload,
});

export const actionGetPictureUrl = (payload) => ({
  type: GET_PICTURE_URL,
  payload,
});

export const actionResetGame = () => ({ type: RESET_GAME });

export const actionSettings = ({ difficulty, category, tipo }) => ({
  type: CHANGE_SETTINGS,
  difficulty,
  category,
  tipo,
});
