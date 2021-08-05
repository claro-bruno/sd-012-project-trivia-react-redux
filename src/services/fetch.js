const tokenEndPoint = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const request = await fetch(tokenEndPoint);
  const { token } = await request.json();
  return token;
};

export default fetchToken;
