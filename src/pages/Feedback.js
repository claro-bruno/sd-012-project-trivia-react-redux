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
    const { correctAnswers } = this.props;
    return (
      <>
        <Game />
        <p>
          Acertos:
          <span>
            { correctAnswers }
          </span>
        </p>
        <p data-testid="feedback-text">{ this.feedbackText() }</p>
      </>
    );
  }
}

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
};

/*  const mapStateToProps = (state) => ({
  correctAnswers: state.user.assertions,
}); */

export default Feedback;

// export default connect(mapStateToProps)(Feedback);
