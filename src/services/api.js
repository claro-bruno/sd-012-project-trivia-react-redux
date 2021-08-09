export const url = 'https://opentdb.com/api_token.php?command=request';
export const questionUrl = 'https://opentdb.com/api.php?amount=5&token=';

export default async function getInfo() {
  const data = await fetch(`${url}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  const { token } = data;
  JSON.stringify(localStorage.setItem('token', token));
  return data;
}

export async function getQuestions() {
  let token = localStorage.getItem('token');

  if (!token) {
    await getInfo();
    token = localStorage.getItem('token');
  }
  const data = await fetch(`${questionUrl}${token}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  JSON.stringify(localStorage.setItem('token', token));
  return data.results;
}
