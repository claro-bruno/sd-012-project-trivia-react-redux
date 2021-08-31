import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import PlayerHeader from '../components/Header';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <PlayerHeader />
        <Question history={ history } />
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
