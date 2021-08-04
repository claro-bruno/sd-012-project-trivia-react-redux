const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  const fetchAPI = await fetch(URL_TOKEN);
  const jsonObj = await fetchAPI.json();
  const { token } = jsonObj;
  localStorage.setItem('token', token);
};

export default requestToken;
