import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { type, name, id, value, onChange, labelTxt, testId } = this.props;
    return (
      <label htmlFor={ id }>
        { labelTxt }
        <input
          type={ type }
          name={ name }
          id={ id }
          value={ value }
          onChange={ onChange }
          data-testid={ testId }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string,
  labelTxt: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  labelTxt: '',
  testId: '',
};
