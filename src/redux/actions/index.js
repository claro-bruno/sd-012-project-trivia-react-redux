export const CREATE_LOGIN = 'CREATE_LOGIN';

export default function createLogin(state) {
  return {
    type: CREATE_LOGIN,
    email: state,
  };
}
