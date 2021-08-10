import React from 'react';
import { string, func } from 'prop-types';

class Input extends React.Component {
  render() {
    const { itemName, name, type, testId, onChange, value, id, className } = this.props;
    return (
      <label htmlFor={ name } className={ className }>
        {/* {itemName} */}
        <input
          placeholder={ itemName }
          className={ className }
          type={ type }
          name={ name }
          id={ id }
          onChange={ onChange }
          value={ value }
          data-testid={ testId }
        />
      </label>
    );
  }
}

Input.propTypes = {
  itemName: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  onChange: func.isRequired,
  testId: string.isRequired,
  value: string.isRequired,
  id: string.isRequired,
  className: string.isRequired,
};

export default Input;
