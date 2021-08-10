import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Ranking.css';

class Ranking extends React.Component {
  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = getRanking.sort((a, b) => b.score - a.score);
    return (
      <section className="section-ranking">
        <h2 className="title" data-testid="ranking-title">Ranking</h2>
        <ul className="ranking-list">
          {sortRanking.map((e, index) => (
            <li key={ e.picture } className="li-ranking">
              <img src={ e.picture } alt="player pic" id="user-pic" />
              {' '}
              <p data-testid={ `player-name-${index}` }>{e.name}</p>
              {' '}
              <p className="score" data-testid={ `player-score-${index}` }>{e.score}</p>
            </li>
          ))}
        </ul>
        <Link to="/">
          <Button
            type="button"
            className="go-back-btn"
            data-testid="btn-go-home"
            variant="contained"
            color="secondary"
          >
            <ArrowBackIcon />
            Início
          </Button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
