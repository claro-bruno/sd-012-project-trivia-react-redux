import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.shouldRedirect = this.shouldRedirect.bind(this);
  }

  shouldRedirect() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = getRanking.sort((a, b) => b.score - a.score);
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <section className="section-ranking">
        <h2 className="title" data-testid="ranking-title">Ranking</h2>
        <ul className="ranking-list">
          <li className="li-header">
            <p>Foto de Perfil</p>
            <p>Nome</p>
            <p>Score</p>
          </li>
          {sortRanking.map((e, index) => (
            <li key={ e.picture } className="li-ranking">
              <img src={ e.picture } alt="player pic" id="user-pic" />
              {' '}
              <p id="" data-testid={ `player-name-${index}` }>{e.name}</p>
              {' '}
              <p className="score" data-testid={ `player-score-${index}` }>{e.score}</p>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          className="go-back-btn"
          data-testid="btn-go-home"
          variant="contained"
          color="secondary"
          onClick={ () => this.shouldRedirect() }
        >
          <ArrowBackIcon />
          Início
        </Button>
      </section>
    );
  }
}

export default Ranking;
