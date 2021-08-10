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
        className,
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
          className={ className }
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
  className: string,
  label: string,
  value: string,
  onChange: func.isRequired,
  testId: string,
  type: string.isRequired,
};

Input.defaultProps = {
  testId: '',
  className: '',
  label: '',
  value: '',
};
