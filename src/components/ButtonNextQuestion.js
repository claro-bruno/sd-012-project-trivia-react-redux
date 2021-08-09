import React from 'react';
import PropTypes from 'prop-types';

class ButtonNextQuestion extends React.Component {
  render() {
    const { onClick, disableButton } = this.props;
    return (
      <div>
        <button
          disabled={ disableButton }
          type="button"
          onClick={ onClick }
          data-testid="btn-next"
        >
          Próxima
        </button>
      </div>
    );
  }
}

ButtonNextQuestion.propTypes = {
  onClick: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
};

export default ButtonNextQuestion;
