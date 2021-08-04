const url = 'https://opentdb.com/api_token.php?command=request';

export default async function getInfo() {
  const data = await fetch(`${url}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  const { token } = data;
  localStorage.setItem('token', token);
  return data;
}

export const API_TRIVIA = async (token) => {
  const TRIVIA = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(TRIVIA);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.log(error);
  }
};
