import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const {
      props: {
        disabled,
        testId,
        name,
      },
    } = this;
    return (
      <button
        data-testid={ testId }
        type="button"
        disabled={ disabled }
      >
        { name }
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
  name: string.isRequired,
};

// export default Button;
