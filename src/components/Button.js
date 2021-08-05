import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const {
      props: {
        disabled,
        testId,
        name,
        handleClick,
      },
    } = this;
    return (
      <button
        data-testid={ testId }
        type="button"
        disabled={ disabled }
        onClick={ handleClick }
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
  disabled: bool,
  testId: string.isRequired,
  name: string.isRequired,
  handleClick: func.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

// export default Button;
