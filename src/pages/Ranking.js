import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadRankingFromStorage } from '../services/localStorage';
import '../styles/ranking.css';
import trophy from '../assets/trophy-icon.png';

class Ranking extends Component {
  render() {
    const ranking = loadRankingFromStorage();
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking">
        <img className="trophy" src={ trophy } alt="rank" />
        <p className="rank_title" data-testid="ranking-title">Ranking</p>
        <ul className="ranking_list">
          { orderedRanking.map((player, index) => (
            <li className="rank_info" key={ index }>
              <img className="rank_img" src={ player.gravatarUrl } alt={ player.name } />
              <p
                className="rank_name"
                data-testid={ `player-name-${index}` }
              >
                { player.name }
              </p>
              <p
                className="rank_score"
                data-testid={ `player-score-${index}` }
              >
                { player.score }
              </p>
            </li>
          )) }
        </ul>
        <Link className="home_btn" to="/" data-testid="btn-go-home">
          Tela inicial
        </Link>
      </div>
    );
  }
}

export default Ranking;
