import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSection extends Component {
  render() {
    const { name, email, handleChange } = this.props;

    return (
      <section>
        <input
          type="text"
          placeholder="nome"
          name="name"
          value={ name }
          onChange={ handleChange }
          data-testid="input-player-name"
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          value={ email }
          onChange={ handleChange }
          data-testid="input-gravatar-email"
        />
      </section>
    );
  }
}

InputSection.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputSection;
