import md5 from 'crypto-js/md5';

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_GRAVATAR = 'https://www.gravatar.com/avatar/';
const URL_CATEGORIES = 'https://opentdb.com/api_category.php';

export const requestToken = async () => {
  const fetchAPI = await fetch(URL_TOKEN);
  const jsonObj = await fetchAPI.json();
  const { token } = jsonObj;
  localStorage.setItem('token', token);
};

export const addStateToStorage = (valueKey, value) => {
  const stateObject = JSON.parse(localStorage.getItem('state'));
  const playerObject = stateObject ? stateObject.player : {};
  localStorage.setItem(
    'state',
    JSON.stringify({ player: { ...playerObject, [valueKey]: value } }),
  );
};

export const addRankingToStorage = (newRanking) => {
  const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
  const rankingArray = rankingStorage || [];
  localStorage.setItem(
    'ranking',
    JSON.stringify([...rankingArray, newRanking]),
  );
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const requestImageGravatar = (email) => {
  const hash = md5(email).toString();
  const imageURL = `${URL_GRAVATAR}${hash}`;
  return imageURL;
};

export const answerCheck = (correctAnswer, answer, index) => {
  if (answer === correctAnswer) {
    return 'correct-answer';
  }
  return `wrong-answer-${index}`;
};

export const classChanger = (correctAnswer, answer, click) => {
  if (click) {
    if (answer === correctAnswer) {
      return 'correctAnswer';
    }
    return 'wrongAnswer';
  }
  return 'aBtn';
};

export const requestCategories = async () => {
  const fetchAPI = await fetch(URL_CATEGORIES);
  const jsonObj = await fetchAPI.json();
  return jsonObj.trivia_categories;
};
