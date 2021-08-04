export const SEND_USER_INFO = 'SEND_USER_INFO';

export const sendUserInfo = (name, email, image) => ({
  type: SEND_USER_INFO, name, email, image,
});
