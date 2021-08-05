import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UniqueButton extends Component {
  render() {
    const { className, onClick, innerText } = this.props;
    return (
      <button
        className={ className }
        type="button"
        data-testid={ className }
        id={ className }
        onClick={ onClick }
      >
        { innerText }
      </button>
    );
  }
}

UniqueButton.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  innerText: PropTypes.string.isRequired,
};

export default UniqueButton;
