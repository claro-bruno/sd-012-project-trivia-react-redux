import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button
        type="button"
        className="btn btn-link"
        data-testid="btn-next"
        onClick={ handleClick }
      >
        Próxima
      </button>
    );
  }
}

AnswerButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default AnswerButton;
