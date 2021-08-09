import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Game from './Game';

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
        <Game />
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
