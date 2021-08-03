import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { disabled } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-play"
        disabled={ disabled }
      >
        Jogar
      </button>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default Button;
