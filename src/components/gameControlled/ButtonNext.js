import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

class ButtonNext extends React.Component {
  render() {
    const { props: { invisible, nextQuestion } } = this;
    return (
      invisible
        ? null
        : (
          <Button
            testId="btn-next"
            type="button"
            name="Próxima"
            handleClick={ nextQuestion }
          />
        )
    );
  }
}

const { bool, func } = PropTypes;
ButtonNext.propTypes = {
  invisible: bool.isRequired,
  nextQuestion: func.isRequired,
};

export default ButtonNext;
