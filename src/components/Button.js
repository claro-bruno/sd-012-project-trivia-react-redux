import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { buttonText, testId, onClick } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ onClick }
      >
        { buttonText }
      </button>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
