const fetchApiGame = async (token) => {
  const numberOfQuestions = 5;
  const linkApi = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  const response = await fetch(linkApi);
  const { results } = await response.json();
  return results;
};

export default fetchApiGame;
