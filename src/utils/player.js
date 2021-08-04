const getRanking = () => JSON.parse(localStorage.getItem('ranking')) || [];
export default getRanking;
