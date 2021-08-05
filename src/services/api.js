import { MD5 } from 'crypto-js';

export const fetchApi = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const fetchTrivia = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = fetchApi(url);
  return data;
};

export const fetchGravatarImage = async (email) => {
  const BASE_URL = 'https://www.gravatar.com/avatar/';
  const HASH = MD5(email).toString();
  const DATA = await fetch(`${BASE_URL}${HASH}`);
  const userImageURL = DATA.url;
  return userImageURL;
};

export const fetchToken = () => {
  const BASE_URL = 'https://opentdb.com/api_token.php?command=request';
  const TOKEN = fetchApi(BASE_URL);
  console.log(TOKEN);
};
