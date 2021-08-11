import React from 'react';
import PropTypes from 'prop-types';
import { MdNavigateNext } from 'react-icons/md';

class NextButton extends React.Component {
  render() {
    const { onClick, hidden } = this.props;
    return (

      <button
        type="button"
        data-testid="btn-next"
        onClick={ onClick }
        style={ {
          visibility: hidden ? 'hidden' : '',
          background: 'none',
          border: 'none',
        } }

      >
        <MdNavigateNext
          color="green"
          cursor="pointer"
          size="7vw"
        >
          Próximo

        </MdNavigateNext>
      </button>
    );
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
}.isRequired;

export default NextButton;
