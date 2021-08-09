const tokenEndPoint = 'https://opentdb.com/api_token.php?command=request';
const quizEndPoint = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchToken = async () => {
  const request = await fetch(tokenEndPoint);
  const { token } = await request.json();
  return token;
};

export const fetchQuiz = async () => {
  const token = await fetchToken();
  const request = await fetch(`${quizEndPoint}${token}`);
  const { results } = await request.json();
  return results;
};
