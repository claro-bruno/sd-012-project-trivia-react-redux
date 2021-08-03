export const getLogin = (value) => ({
  type: 'LOGIN',
  ...value,
});

export const saveToken = (value) => ({
  type: 'TOKEN',
  ...value,
});

export const getAPI = () => async (dispatch) => {
  let request = await fetch('https://opentdb.com/api_token.php?command=request');
  request = await request.json();
  localStorage.setItem('token', JSON.stringify(request.token));
  try {
    return dispatch(saveToken(request));
  } catch (error) {
    return dispatch(saveToken(error));
  }
};
