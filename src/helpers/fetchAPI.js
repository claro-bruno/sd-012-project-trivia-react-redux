const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const response = await fetch(TOKEN_URL);
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

export const fetQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return data;
};
