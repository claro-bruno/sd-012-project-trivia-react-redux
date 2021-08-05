export const NAME_SET = 'USER_SET';
export const EMAIL_SET = 'EMAIL_SET';

export const nameSet = (payload) => ({
  type: NAME_SET,
  payload,
});

export const emailSet = (payload) => ({
  type: EMAIL_SET,
  payload,
});
