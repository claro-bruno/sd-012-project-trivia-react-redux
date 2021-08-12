import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
// import Score from '../Components/Score';

const minAssertionsForPositiveFeedback = 3;

class Feedback extends Component {
  render() {
    const { assertions, history } = this.props;
    return (
      <>
        <Header />
        <div className="feedBack">
          <h1
            className="feedText"
            data-testid="feedback-text"
          >
            {assertions < minAssertionsForPositiveFeedback
              ? 'Podia ser melhor...'
              : 'Mandou bem!'}
          </h1>
          {/* <Score dataTestId="header-score" /> */}
          {/* O requisito 12 o teste procura por este Id */}
          {/* <Score dataTestId="feedback-total-score" /> */}
          {/* O requisito 14 o teste procura por este Id */}
          <h1
            className="feedText"
            data-testid="feedback-total-question"
          >
            {`Você acertou ${assertions} perguntas.`}
          </h1>
          <button
            className="playAgain"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <Link className="ranking" data-testid="btn-ranking" to="/ranking">Ranking</Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
