import md5 from 'crypto-js/md5';

export const getRanking = () => JSON.parse(localStorage.getItem('ranking')) || [];
export const getPlayer = () => JSON.parse(localStorage.getItem('state')) || {};
export const getAvatar = (email) => {
  const hash = md5(email).toString();
  const avatar = `https://www.gravatar.com/avatar/${hash}`;
  return avatar;
};

export const setNewScore = (addScore) => {
  const { player } = getPlayer();
  if (!player) return;

  const newPlayer = {
    ...player,
    score: player.score + addScore,
    assertions: player.assertions + 1,
  };

  localStorage.setItem('state', JSON.stringify({ player: newPlayer }));
};

export const setNewPlayer = ({ name, email }) => {
  const player = {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
  };
  localStorage.setItem('state', JSON.stringify({ player }));
};

export const savePlayerAtRanking = () => {
  const { player } = getPlayer();
  const ranking = getRanking();
  if (!player.name) return;
  const newRanking = [...ranking, player];
  newRanking.sort((player1, player2) => player2.score - player1.score);

  localStorage.setItem(
    'ranking',
    JSON.stringify(newRanking),
  );
};
