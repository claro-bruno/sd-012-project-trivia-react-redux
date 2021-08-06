export const getLogin = (value) => ({
  type: 'LOGIN',
  ...value,
});

export const saveToken = (value) => ({
  type: 'TOKEN',
  ...value,
});

export const getQuestion = (value) => ({
  type: 'QUESTION',
  value,
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

export const getTriviaAPI = (token) => async (dispatch) => {
  const questionsNumber = 2;
  let request = await fetch(`https://opentdb.com/api.php?amount=${questionsNumber}&token=${token}`);
  request = await request.json();
  try {
    return dispatch(getQuestion(request));
  } catch (error) {
    return dispatch(getQuestion(error));
  }
};
