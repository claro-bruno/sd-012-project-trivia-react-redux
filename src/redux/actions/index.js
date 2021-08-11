import { fetchGravatar } from '../../services/api';

export const CREATE_LOGIN = 'CREATE_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';
export const SAVE_AVATAR = 'SAVE_AVATAR';
export const RESET_ASSERTIONS = 'RESET_ASSERTIONS';

export function createLogin(state, email) {
  return {
    type: CREATE_LOGIN,
    name: state,
    gravatarEmail: email,
  };
}

export const saveAvatar = (avatar) => (
  {
    type: SAVE_AVATAR,
    avatar,
  }
);

export const fetchAvatar = (email) => async (dispatch) => {
  try {
    const avatar = await fetchGravatar(email);
    dispatch(saveAvatar(avatar));
  } catch (e) {
    console.log(e);
  }
};

export function getQuestions(state) {
  return {
    type: GET_QUESTIONS,
    questions: state,
  };
}

export const resetAssertions = () => (
  {
    type: RESET_ASSERTIONS,
  }
);

export function getScore(state, finalScore) {
  return {
    type: GET_SCORE,
    assertions: state,
    score: finalScore,
  };
}
