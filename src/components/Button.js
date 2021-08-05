import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const {
      props: {
        disabled,
        testId,
        name,
        btnAction,
      },
    } = this;
    return (
      <button
        data-testid={ testId }
        type="button"
        disabled={ disabled }
        onClick={ btnAction }
      >
        { name }
      </button>
    );
  }
}

const {
  bool,
  string,
  func,
} = PropTypes;

Button.propTypes = {
  disabled: bool.isRequired,
  testId: string.isRequired,
  name: string.isRequired,
  btnAction: func.isRequired,
};

// export default Button;
