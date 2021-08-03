export const USER_INFO = 'USER_INFO';

export const actionUserInfo = (name, value) => ({
  type: USER_INFO,
  name,
  value,
});