import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.scoreBoard = this.scoreBoard.bind(this);
    this.noStorageData = this.noStorageData.bind(this);
  }

  scoreBoard() {
    const localStorageData = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="score-board">
        {localStorageData && localStorageData
          .sort((a, b) => b.score - a.score)
          .map((eachPlayer, index) => (
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
  }

  noStorageData() {
    return <span>Sem pontuações no momento.</span>;
  }

  render() {
    const localStorageData = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>
        {localStorageData ? this.scoreBoard() : this.noStorageData()}
        <Link
          className="ranking-button-container"
          to="/"
        >
          <button data-testid="btn-go-home" className="ranking-button" type="button">
            Página de Login
          </button>
        </Link>
      </div>);
  }
}

export default Ranking;
