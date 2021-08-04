import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, type, name, testid, onChange, placeholder } = this.props;
    return (
      <label htmlFor={ id }>
        <input
          id={ id }
          type={ type }
          name={ name }
          onChange={ onChange }
          data-testid={ testid }
          placeholder={ placeholder }
        />
      </label>
    );
  }
}

Input.propTypes = ({
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  testid: PropTypes.string,
  placeholder: PropTypes.string,
}).isRequired;

export default Input;
