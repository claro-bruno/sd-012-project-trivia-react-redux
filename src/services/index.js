export const requestTrivia = async (currentMode) => {
  let token = localStorage.getItem('token');
  if (!token) token = await requestToken();
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}&difficulty=${currentMode}`);
  const json = await request.json();
  return json;
};

export const requestToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await request.json();
  return token;
};
