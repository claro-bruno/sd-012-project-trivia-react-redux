import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const {
      props: {
        disabled,
        testId,
      },
    } = this;
    return (
      <button
        data-testid={ testId }
        type="button"
        disabled={ disabled }
      >
        Próxima
      </button>
    );
  }
}

const {
  bool,
  string,
} = PropTypes;

Button.propTypes = {
  disabled: bool.isRequired,
  testId: string.isRequired,
};

// export default Button;
