import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateQuestion } from '../redux/actions';

class NextButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { qnNum, updateQuestion: update } = this.props;
    const newQnNum = qnNum + 1;
    update({ question: { answered: false, qnNum: newQnNum } });
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleClick }
        className="next-btn"
      >
        Next
      </button>
    );
  }
}

const mapDispatchToProps = { updateQuestion };

NextButton.propTypes = {
  qnNum: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NextButton);
