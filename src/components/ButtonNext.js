import React, { Component } from 'react';
import { string, func } from 'prop-types';

class ButtonNext extends Component {
  render() {
    const { testId, changeQuestion } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ changeQuestion }
      >
        Próxima
      </button>
    );
  }
}

ButtonNext.propTypes = {
  testId: string.isRequired,
  changeQuestion: func.isRequired,
};

export default ButtonNext;
