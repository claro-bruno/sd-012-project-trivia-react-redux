import React from 'react';
import { func, string, bool } from 'prop-types';

class Button extends React.Component {
  render() {
    const { onClick, itemName, disabled, testId, className } = this.props;
    return (
      <button
        className={ className }
        type="button"
        // className="login-btn"
        data-testid={ testId }
        disabled={ disabled }
        onClick={ onClick }
      >
        {itemName}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: func.isRequired,
  itemName: string.isRequired,
  disabled: bool.isRequired,
  testId: string.isRequired,
  className: string.isRequired,
};

export default Button;
