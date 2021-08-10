export const CREATE_LOGIN = 'CREATE_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';

export function createLogin(state, email) {
  return {
    type: CREATE_LOGIN,
    name: state,
    gravatarEmail: email,
  };
}

export function getQuestions(state) {
  return {
    type: GET_QUESTIONS,
    questions: state,
  };
}

export function getScore(state, finalScore) {
  return {
    type: GET_SCORE,
    assertions: state,
    score: finalScore,
  };
}
