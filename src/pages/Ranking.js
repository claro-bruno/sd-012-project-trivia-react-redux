import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import styles from './Ranking.module.css';
import G4Logo from '../G4.gif';

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
        <img src={ G4Logo } className={ styles.g4Logo } alt="logo" />
        <div className={ styles.rankBack }>
          <div className={ styles.rankHeader }>
            <h1 data-testid="ranking-title">
              Ranking
            </h1>
            <ol>
              { ranking.map((user, index) => (
                <li key={ index }>
                  <div className={ styles.rankListItem }>
                    <img
                      src={ user.picture }
                      alt="Foto"
                      className={ styles.imagePlayer }
                    />
                    <div className={ styles.playerInfoContainer }>
                      <div>
                        <span className={ styles.player }>Player:</span>
                        <span data-testid={ `player-name-${index}` }>{ user.name }</span>
                      </div>
                      <div>
                        <span className={ styles.score }>Score:</span>
                        <span
                          data-testid={ `player-score-${index}` }
                        >
                          { user.score }
                        </span>
                      </div>
                    </div>
                  </div>
                </li>))}
            </ol>
            <Button
              testId="btn-go-home"
              onClick={ () => this.handleClick('/') }
              buttonText="Tela de preenchimento dos dados"
            />
          </div>
        </div>
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
