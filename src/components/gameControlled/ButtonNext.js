import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

class ButtonNext extends React.Component {
  render() {
    const { props: { invisible, handleClick } } = this;
    return (
      invisible
        ? null
        : (
          <Button
            testId="btn-next"
            name="Próxima"
            handleClick={ handleClick }
          />
        )
    );
  }
}

const { bool, func } = PropTypes;
ButtonNext.propTypes = {
  invisible: bool.isRequired,
  handleClick: func.isRequired,
};

export default ButtonNext;
