import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    const {
      props: {
        name,
        label,
        value,
        onChange,
        testId,
        type,
      },
    } = this;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          id={ name }
          data-testid={ testId }
          name={ name }
          type={ type }
          value={ value }
          onChange={ onChange }
          required
        />
      </label>
    );
  }
}

const {
  string,
  func,
} = PropTypes;

Input.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  testId: string.isRequired,
  type: string.isRequired,
};
