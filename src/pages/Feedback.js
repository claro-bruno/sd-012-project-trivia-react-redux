import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import happy from '../assets/happy-brain.png';
import sad from '../assets/sad-brain.png';
import '../styles/feedback.css';

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

  feedBackImg() {
    const { assertions } = this.props;
    if (assertions >= 2) {
      return <img className="happy" src={ happy } alt="brain" />;
    }
    return <img className="sad" src={ sad } alt="brain" />;
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        {this.feedBackImg()}
        <div className="feedback_page">
          <div className="feedback_info">
            <p>
              Acertos:
              <span data-testid="feedback-total-question">
                {' '}
                { assertions }
              </span>
            </p>
            <p>
              Seu score:
              <span data-testid="feedback-total-score">
                {' '}
                { score }
              </span>
            </p>
            <p data-testid="feedback-text">{ this.feedbackText() }</p>
          </div>
          <div className="feedback_btns">
            <Link to="/game">
              <button
                type="button"
                data-testid="btn-play-again"
                className="play_again_btn_feed"
              >
                Jogar novamente
              </button>
            </Link>
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
                className="rank_btn_feed"
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
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
