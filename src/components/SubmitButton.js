import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SubmitButton extends Component {
  render() {
    const { onClick, disabled, buttonTxt, testId } = this.props;
    return (
      <div>
        <button
          type="submit"
          onClick={ onClick }
          disabled={ disabled }
          data-testid={ testId }
        >
          { buttonTxt }
        </button>
      </div>
    );
  }
}

SubmitButton.propTypes = {
  buttonTxt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  testId: PropTypes.string,
};

SubmitButton.defaultProps = {
  testId: '',
};
