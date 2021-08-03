import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, type, name, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        <input
          id={ id }
          type={ type }
          name={ name }
          onChange={ onChange }
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
}).isRequired;

export default Input;
