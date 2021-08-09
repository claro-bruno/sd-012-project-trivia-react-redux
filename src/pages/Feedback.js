import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const minimalGuess = 3;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h2
          data-testid="feedback-text"
        >
          { assertions < minimalGuess ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <div>
          <h3>Pontuação</h3>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <div>
          <h3>Acertos</h3>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
