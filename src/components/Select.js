import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { labelText, options, onChange, name, value } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          { labelText }
        </label>
        <select
          onChange={ onChange }
          id={ name }
          name={ name }
          value={ value }
        >
          { options.map((option) => (
            <option key={ option.id } value={ option.id }>
              { option.name }
            </option>
          )) }
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
