export const SAVE_LOGIN = 'SAVE_LOGIN';

export const saveLogin = (state, hashEmail) => ({
  type: SAVE_LOGIN,
  email: state.email,
  name: state.name,
  hashEmail,
});
