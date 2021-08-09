import React from 'react';
import PropTypes from 'prop-types';

class UserInputs extends React.Component {
  render() {
    const { id, name, innerHtml, type, onChange } = this.props;

    return (
      <label htmlFor={ id }>
        {innerHtml}
        <input
          className="input-gen"
          data-testid={ id }
          type={ type }
          name={ name }
          onChange={ onChange }
        />
      </label>
    );
  }
}

UserInputs.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default UserInputs;
