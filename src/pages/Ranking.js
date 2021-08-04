import React from 'react';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  render() {
    const localStorageData = JSON.parse(localStorage.getItem('ranking'));

    // Colocando o elemento do ranking em uma variável pra usar renderização condicional.
    // Caso o localStorageData não tenha nenhum dado, ele recebe null então retorna um erro ao fazer o map

    const scoreBoard = (
      <div className="score-board">
        {localStorageData && localStorageData.map((eachPlayer, index) => (
          <ul className="eachPlayer-list" key={ index }>
            <li><img src={ `${eachPlayer.picture}` } alt="" /></li>
            <li data-testid={ `player-name-${index}` }>{eachPlayer.name}</li>
            <li data-testid={ `player-score-${index}` }>
              {eachPlayer.score}
              pts
            </li>
          </ul>
        ))}
      </div>);

    const noStorageData = <span>Sem pontuações no momento.</span>;
    return (
      <div className="ranking-page">
        <h1>Ranking</h1>
        {localStorageData ? scoreBoard : noStorageData}
      </div>);
  }
}

export default Ranking;
