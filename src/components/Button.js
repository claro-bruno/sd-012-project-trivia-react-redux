import React from 'react';
import { func, string, bool } from 'prop-types';

class Button extends React.Component {
  render() {
    const { onClick, itemName, disabled, testId } = this.props;
    return (
      <button
        type="button"
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
};

export default Button;
