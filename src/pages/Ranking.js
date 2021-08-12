import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '../components/Feedback';
import { setReset } from '../actions';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    const { reset, history } = this.props;
    reset();
    history.push('/');
  }

  render() {
    const arrayRanking = JSON.parse(localStorage.getItem('ranking'));
    const arrayOrdered = arrayRanking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-container">
        <div className="ranking-header">
          <h1 data-testid="ranking-title">Ranking</h1>
        </div>
        <div className="ranking-list">
          <ul>
            {arrayOrdered.map((player, i) => (
              <div
                className="player-ranking-container"
                key={ player }
              >
                <li
                  key={ i }
                  className="player-ranking-li"
                >
                  <img
                    src={ player.picture }
                    alt="img-perfil"
                    className="ranking-player-img"
                  />
                  <div
                    className="ranking-name-score-container"
                  >
                    <span data-testid={ `player-name-${i}` }>{player.name}</span>
                    <span data-testid={ `player-score-${i}` }>{player.score}</span>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div
          className="ranking-button"
        >
          <Button
            testId="btn-go-home"
            onClick={ this.goHome }
            label="Jogar Novamente"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(setReset()),
});

Ranking.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
  reset: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
