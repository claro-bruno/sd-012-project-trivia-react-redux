// export const getApiToken = () => {
//   const endpoint = 'https://opentdb.com/api_token.php?command=request';
//   try {
//     fetch(endpoint)
//       .then((response) => response.json())
//       .then((data) => localStorage.setItem('token', data.token));
//   } catch (err) {
//     return 'Api não encontrada';
//   }
// };

const getApiQuestions = (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const questions = fetch(endpoint)
    .then((data) => data.json())
    .then((response) => response.results)
    .catch((err) => err);
  return questions;
};

export default getApiQuestions;
