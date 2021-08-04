import md5 from 'crypto-js/md5';

export const GET_API_GRAVATAR = 'GET_API_GRAVATAR';
export const GET_API_GRAVATAR_SUCESS = 'GET_API_GRAVATAR_SUCESS';
export const GET_API_GRAVATAR_ERROR = 'GET_API_GRAVATAR_ERROR';

export const getGravatar = () => ({
  type: GET_API_GRAVATAR,
});

export const getGravatarSucess = (avatar) => ({
  type: GET_API_GRAVATAR_SUCESS,
  payload: avatar,
});

export const getGravatarError = (error) => ({
  type: GET_API_GRAVATAR_ERROR,
  payload: error,
});

export const gravatarFetchAPI = (email) => async (dispatch) => {
  dispatch(getGravatar());
  const hash = md5(email).toString();
  const END_POINT = `https://www.gravatar.com/avatar/${hash}`;
  fetch(END_POINT)
    .then((data) => data.json())
    .then((results) => dispatch(getGravatarSucess(results)))
    .catch((error) => dispatch(getGravatarError(error)));
};
