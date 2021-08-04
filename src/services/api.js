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
