import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { score, name, gravatarUrl } = this.props;
    const oldRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const ranking = {
      name,
      score,
      gravatarUrl,
    };
    oldRanking.ranking = ranking;
    localStorage.setItem('ranking', JSON.stringify([...oldRanking, ranking]));
  }

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
  name: PropTypes.string.isRequired,
  gravatarUrl: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarUrl: state.player.gravatarUrl,
});

export default connect(mapStateToProps)(Feedback);
