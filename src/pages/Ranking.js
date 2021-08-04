import React from 'react';
import PropTypes from 'prop-types';
import getRanking from '../utils/player';
import GenericBtn from '../components/GenericBtn';

class Ranking extends React.Component {
  render() {
    const ranking = getRanking();
    const { history } = this.props;
    
    const homeBtnProps = {
      id: 'btn-go-home',
      name: 'home',
      value: 'Voltar ao início',
      onClick: () => history.push('/'),
    };
    
    return (
      <div>
        <GenericBtn { ...homeBtnProps } />
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img alt={ player.name } src={ player.gravatarEmail } />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
