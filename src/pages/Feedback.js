import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//  import Game from './Game';
import Header from '../components/Header';

class Feedback extends React.Component {
  feedbackText() {
    const { assertions } = this.props;
    const parametroResposta = 3;
    if (assertions < parametroResposta) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <p>
          Acertos:
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>
        <p>
          Seu score:
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
        <p data-testid="feedback-text">{ this.feedbackText() }</p>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.login.player.assertions,
  score: state.login.player.score,
});

export default connect(mapStateToProps)(Feedback);
