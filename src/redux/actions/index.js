import { requestTrivia } from '../../services';

export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const PLAYER_INFO = 'PLAYER_INFO';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const CURRENT_SCORE = 'CURRENT_SCORE';
export const PLAYER_ASSERTIONS = 'PLAYER_ASSERTIONS';

export const playerInfo = ({ name, email, avatar }) => ({
  type: PLAYER_INFO,
  name,
  email,
  avatar,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  payload: score,
});

export const addAssertion = () => ({
  type: PLAYER_ASSERTIONS,
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
