const numberOfQuestions = 5;
const { token } = localStorage;
const END_POINT = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;

const fetchApiGame = async () => {
  const response = await fetch(END_POINT);
  const { results } = await response.json();
  return results;
};

export default fetchApiGame;
