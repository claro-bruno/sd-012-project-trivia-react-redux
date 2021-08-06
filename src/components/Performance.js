import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Performance extends React.Component {
  constructor(props) {
    super(props);

    this.genMessage = this.genMessage.bind(this);
  }

  genMessage() {
    const { assertions } = this.props;
    const tres = 3;
    if (assertions < tres) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <div data-testid="feedback-text">{ this.genMessage() }</div>
        <div data-testid="feedback-total-score">{ score }</div>
        <div data-testid="feedback-total-question">{ assertions }</div>
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
