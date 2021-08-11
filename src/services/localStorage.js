export const localStorageRankingInit = () => {
  const ranking = localStorage.getItem('ranking');
  if (!ranking) {
    const emtpyArr = [];
    const save = JSON.stringify(emtpyArr);
    localStorage.setItem('ranking', save);
  }
};

export const loadRankingFromStorage = () => {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return ranking;
};
