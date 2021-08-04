export const CREATE_LOGIN = 'CREATE_LOGIN';
export const API = 'API';
export const TOKEN = 'TOKEN';

export default function createLogin(state, email) {
  return {
    type: CREATE_LOGIN,
    name: state,
    gravatarEmail: email,
  };
}

export const requisitionAPI = (payload) => ({
  type: 'API',
  payload,
});

export const Token = (payload) => ({
  type: 'TOKEN',
  payload,
});
