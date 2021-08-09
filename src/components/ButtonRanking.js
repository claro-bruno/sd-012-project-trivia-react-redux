import React from 'react';
import PropTypes from 'prop-types';

class ButtonRanking extends React.Component {
  render() {
    const { onClick, itemName, testId } = this.props;
    return (
      <button
        type="button"
        className="btn-ranking"
        data-testid={ testId }
        onClick={ onClick }
      >
        { itemName }
      </button>
    );
  }
}

ButtonRanking.propTypes = {
  onClick: PropTypes.func,
  itemName: PropTypes.string,
  testId: PropTypes.string,
}.isRequired;

export default ButtonRanking;
