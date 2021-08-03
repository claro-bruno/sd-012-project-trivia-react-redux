import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { obj, handleChange } = this.props;
    return (
      <section>
        <label htmlFor="name-input">
          <input
            name={ obj.name }
            // value={ obj.type }
            data-testid={ obj.dataTestId }
            type={ obj.typeText }
            placeholder={ obj.placeholder }
            onChange={ handleChange }
          />
        </label>
      </section>
    );
  }
}

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  obj: PropTypes.objectOf(PropTypes.string, PropTypes.func).isRequired,
};

export default Input;
