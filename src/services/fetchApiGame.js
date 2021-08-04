const numberOfQuestions = 5;
const token = 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';
const END_POINT = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;

const fetchApiGame = async () => {
  const response = await fetch(END_POINT);
  const { results } = await response.json();
  console.log(results);
  return results;
};

export default fetchApiGame;
