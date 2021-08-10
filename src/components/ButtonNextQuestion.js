import React from 'react';
import PropTypes from 'prop-types';

class ButtonNextQuestion extends React.Component {
  render() {
    const { disableButton, answered } = this.props;
    return (
      <div>
        {!disableButton && answered ? (
          <button
            type="button"
            data-testid="btn-next"
          >
            Próxima
          </button>)
          : null}
      </div>
    );
  }
}

ButtonNextQuestion.propTypes = {
  disableButton: PropTypes.bool.isRequired,
  answered: PropTypes.bool.isRequired,
};

export default ButtonNextQuestion;
