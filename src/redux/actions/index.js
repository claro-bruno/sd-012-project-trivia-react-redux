export const USER_INFO = 'USER_INFO';

export const actionUserInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});