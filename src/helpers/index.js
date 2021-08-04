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
