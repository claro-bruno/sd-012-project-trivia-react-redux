import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {ranking.sort((a, b) => (b.score - a.score))
          .map((player, index) => (
            <div key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
                alt="Imagem Avatar"
              />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>
          ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar para o Início</button>
        </Link>
      </div>

export default Ranking;
