import React, { Component } from 'react';
import { string, func } from 'prop-types';

class Input extends Component {
  render() {
    const { value, id, onChange, dataTestId, text } = this.props;
    return (
      <div>
        <label htmlFor={ id }>
          <input
            placeholder={ text }
            className="form-control margin"
            type="text"
            value={ value }
            id={ id }
            name={ id }
            onChange={ onChange }
            data-testid={ `input-${dataTestId}` }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  value: string.isRequired,
  id: string.isRequired,
  onChange: func.isRequired,
  dataTestId: string.isRequired,
  text: string.isRequired,
};

export default Input;
