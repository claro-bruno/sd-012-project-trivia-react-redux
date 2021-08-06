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
        className,
      },
    } = this;
    return (
      <button
        data-testid={ testId }
        type="button"
        disabled={ disabled }
        onClick={ handleClick }
        className={ className }
      >
        { name }
      </button>
    );
  }
}

const { bool, string, func } = PropTypes;

Button.propTypes = {
  disabled: bool,
  testId: string,
  name: string.isRequired,
  handleClick: func.isRequired,
  className: bool,
};

Button.defaultProps = {
  disabled: false,
  testId: '',
  className: '',
};

// export default Button;
