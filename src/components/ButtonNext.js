import React, { Component } from 'react';
import { string } from 'prop-types';

class ButtonNext extends Component {
  render() {
    const { testId } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
      >
        Próxima
      </button>
    );
  }
}

ButtonNext.propTypes = {
  testId: string.isRequired,
};

export default ButtonNext;
