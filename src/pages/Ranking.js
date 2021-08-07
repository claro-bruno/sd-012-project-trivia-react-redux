import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends React.Component {
  handleClick(route) {
    const { history } = this.props;
    history.push(route);
  }

  render() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = playerRanking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ol>
          { ranking.map((user, index) => (
            <li key={ index }>
              <img src={ user.image } alt="Foto" />
              <p data-testid={ `player-name-${index}` }>{ user.name }</p>
              <p data-testid={ `player-score-${index}` }>{ user.score }</p>
            </li>))}
        </ol>
        <Button
          testid="btn-go-home"
          onClick={ () => this.handleClick('/') }
          buttonText="Tela de preenchimento dos dados"
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
