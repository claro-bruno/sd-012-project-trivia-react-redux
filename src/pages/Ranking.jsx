import React, { Component } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
    console.log(rankingStorage);
    return (
      <main className="ranking-page d-flex flex-column position-absolute">
        <Header location="ranking" />
        <div className="ranking-container d-flex flex-column position-absolute">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
          <div className="ranking-list">
            {rankingStorage
              .sort((a, b) => b.score - a.score)
              .map(({ name, score, picture }, i) => (
                <div key={ `name-${i}` } className="ranking row">
                  <img src={ picture } alt={ `${name} avatar` } />
                  <h3 data-testid={ `player-name-${i}` }>{name}</h3>
                  <h3 data-testid={ `player-score-${i}` }>{score}</h3>
                </div>
              ))}
          </div>
          <Button
            testid="btn-go-home"
            inner="Voltar ao início"
            to="/"
            className="btn btn-info"
          />
        </div>
      </main>
    );
  }
}

export default Ranking;
