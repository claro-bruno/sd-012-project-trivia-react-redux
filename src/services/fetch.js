const tokenEndPoint = 'https://opentdb.com/api_token.php?command=request';
const tokenFromStorage = localStorage.getItem('token');
const quizEndPoint = `https://opentdb.com/api.php?amount=5&token=${tokenFromStorage}`;

export const fetchToken = async () => {
  const request = await fetch(tokenEndPoint);
  const { token } = await request.json();
  return token;
};

export const fetchQuiz = async () => {
  const request = await fetch(quizEndPoint);
  const { results } = await request.json();
  return results;
};
