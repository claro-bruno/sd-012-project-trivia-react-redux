import React from 'react';
import PropTypes from 'prop-types';

class ButtonConfig extends React.Component {
  render() {
    const { onClick, itemName, testId, className } = this.props;
    return (
      <button
        className={ className }
        type="button"
        // className="config-btn"
        data-testid={ testId }
        onClick={ onClick }
      >
        { itemName }
      </button>
    );
  }
}

ButtonConfig.propTypes = {
  onClick: PropTypes.func,
  itemName: PropTypes.string,
  testId: PropTypes.string,
}.isRequired;

export default ButtonConfig;
