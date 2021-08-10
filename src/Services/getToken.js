const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const { token } = await response.json();
  return token;
};

export default getToken;
