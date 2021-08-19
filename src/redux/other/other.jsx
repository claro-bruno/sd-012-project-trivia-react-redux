import { MD5 } from 'crypto-js';

const hashGravatar = (email) => {
  const hash = MD5(email);
  return `https://www.gravatar.com/avatar/${hash.toString()}`;
};

const getRanking = () => {
  const json = localStorage.getItem('ranking');
  const ranking = JSON.parse(json);
  if (!ranking) return [];
  return ranking;
};

const saveScore = (name, score, email) => {
  const ranking = getRanking();
  const url = hashGravatar(email);
  const player = { name, score, picture: url };
  ranking.push(player);
  localStorage.setItem('ranking', JSON.stringify(ranking));
};

export default {
  getRanking,
  saveScore,
  hashGravatar,
};
