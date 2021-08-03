function fetchToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => localStorage.setItem('token', data.token));
  } catch (err) {
    console.error(err);
    return 'Api não encontrada';
  }
}

export default fetchToken;
