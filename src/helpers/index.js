import md5 from 'crypto-js/md5';

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_GRAVATAR = 'https://www.gravatar.com/avatar/';

export const requestToken = async () => {
  const fetchAPI = await fetch(URL_TOKEN);
  const jsonObj = await fetchAPI.json();
  const { token } = jsonObj;
  localStorage.setItem('token', token);
};

export const addItemToStorage = (key, valueKey, value) => {
  const localObject = JSON.parse(localStorage.getItem(key));
  localStorage.setItem(
    key,
    JSON.stringify({ ...localObject, [valueKey]: value }),
  );
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
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
