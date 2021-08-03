const url = 'https://opentdb.com/api_token.php?command=request';

export default async function getInfo() {
  const data = await fetch(`${url}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  const { token } = data;
  localStorage.setItem('token', token);
  return data;
}
