const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

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

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
};
