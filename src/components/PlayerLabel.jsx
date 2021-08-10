import React from 'react';
import PropTypes from 'prop-types';

class PlayerLabel extends React.Component {
  render() {
    const { player, index } = this.props;
    const { picture, name, score } = player;
    return (
      <div className="player-label">
        <img src={ picture } alt="Icone do Gravatar" className="ranking-image" />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

PlayerLabel.propTypes = {
  player: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PlayerLabel;
