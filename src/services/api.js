const userUrl = 'https://opentdb.com/api_token.php?command=request';

export async function getUserInfo() {
  return fetch(userUrl)
    .then((response) => response.json());
}
