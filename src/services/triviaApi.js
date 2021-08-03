export const getApiToken = () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const token = fetch(endpoint)
    .then((data) => data.json())
    .then((response) => response.token)
    .catch((err) => err);
  return token;
};

export const getApiQuestions = (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const questions = fetch(endpoint)
    .then((data) => data.json())
    .then((response) => response.results)
    .catch((err) => err);
  return questions;
};
