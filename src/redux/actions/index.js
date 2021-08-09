import { requestTrivia } from '../../services';

export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
const REQUEST_ERROR = 'REQUEST_ERROR';
export const CURRENT_SCORE = 'CURRENT_SCORE';
export const PLAYER_INFO = 'PLAYER_INFO';

export const playerInfo = ({ name, email, avatar }) => ({
  type: PLAYER_INFO,
  name,
  email,
  avatar,
});

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  payload: score,
});

const APISucess = (questions) => ({
  type: REQUEST_TRIVIA,
  payload: questions,
});

const APIFail = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const fetchAPI = (currentMode) => async (dispatch) => {
  try {
    const { results } = await requestTrivia(currentMode);
    dispatch(APISucess(results));
  } catch (error) {
    dispatch(APIFail(error));
  }
};
