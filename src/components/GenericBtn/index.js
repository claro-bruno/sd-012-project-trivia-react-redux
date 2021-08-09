import React from 'react';
import PropTypes from 'prop-types';

class GenericBtn extends React.Component {
  render() {
    const { id, value, disabled, onClick, name, style } = this.props;

    return (
      <button
        className="gen-btn"
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        data-testid={ id }
        name={ name }
        style={ style }
      >
        {value}
      </button>
    );
  }
}

GenericBtn.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default GenericBtn;
