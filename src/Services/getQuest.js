import getToken from './getToken';

const getQuest = async () => {
  let local = localStorage.getItem('token');
  if (!local) {
    local = await getToken();
  }
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${local}`);
  const responseJson = await response.json();
  return responseJson;
};

export default getQuest;
