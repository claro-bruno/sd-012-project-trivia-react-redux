import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Performance extends React.Component {
  constructor(props) {
    super(props);

    this.genMessage = this.genMessage.bind(this);
    this.genFakeMsg = this.genFakeMsg.bind(this);
  }

  genFakeMsg() {
    const { assertions } = this.props;
    const tres = 3;
    if (assertions < tres) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  genMessage() {
    const { assertions } = this.props;
    const tres = 3;
    if (assertions < tres) return 'It could be better...';
    return 'Very well!';
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="performance">
        <div data-testid="feedback-text" className="fake-msg">{ this.genFakeMsg() }</div>
        <div className="message">{ this.genMessage() }</div>
        <span className="results">
          <div className="results-text">Score:</div>
          <div data-testid="feedback-total-score">{ score }</div>
        </span>
        <span className="results">
          <div className="results-text">Assertions:</div>
          <div data-testid="feedback-total-question">{ assertions }</div>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.questions.assertions,
  score: state.questions.score,
});

export default connect(mapStateToProps)(Performance);

Performance.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;
