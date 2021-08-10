import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//  import Game from './Game';
import Header from '../components/Header';

class Feedback extends React.Component {
  // constructor(){
  //  super();
  //  this.feedbackText = this.feedbackText.bind(this);
  // }

  feedbackText() {
    const { correctAnswers } = this.props;
    const parametroResposta = 3;
    if (correctAnswers < parametroResposta) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { correctAnswers, score } = this.props;
    console.log(typeof (correctAnswers));
    return (
      <>
        <Header />
        <p>
          Acertos:
          <span data-testid="feedback-total-question">
            { correctAnswers }
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
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

/*  const mapStateToProps = (state) => ({
  correctAnswers: state.-(ver onde estará no redux)-.assertions,
  score: state.(ver onde estará no redux).score,
}); */

export default Feedback;

// export default connect(mapStateToProps)(Feedback);
