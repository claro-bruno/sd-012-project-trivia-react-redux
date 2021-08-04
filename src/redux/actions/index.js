export const CREATE_LOGIN = 'CREATE_LOGIN';

export default function createLogin(state, email) {
  return {
    type: CREATE_LOGIN,
    name: state,
    gravatarEmail: email,
  };
}
