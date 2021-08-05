import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { className, onClick, innerText, key, dataTestId } = this.props;
    return (
      <button
        className={ className }
        type="button"
        key={ key }
        data-testid={ dataTestId }
        name={ className }
        onClick={ onClick }
      >
        { innerText }
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  innerText: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Button;
