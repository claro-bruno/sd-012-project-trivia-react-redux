import React from 'react';
import PropTypes from 'prop-types';
import './Button.module.css';

class Button extends React.Component {
  render() {
    const { buttonText, testId, disabled, onClick } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        disabled={ disabled }
        onClick={ onClick }
      >
        { buttonText }
      </button>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  testId: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
  testId: '',
};

export default Button;
