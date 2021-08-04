export const actionGetGravatarImg = (url, name) => ({
  type: 'GET_IMG', url, name,
});

export const actionGetToken = (token) => ({
  type: 'GET-TOKEN', token,
});
