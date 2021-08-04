export const CREATE_LOGIN = 'CREATE_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

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
