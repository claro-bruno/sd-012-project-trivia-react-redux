import React, { Component } from 'react';
import { func } from 'prop-types';

class NameInput extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <label
        htmlFor="input-player-name"
        className="label-name"
      >
        <input
          type="text"
          id="input-player-name"
          data-testid="input-player-name"
          onChange={ onChange }
          name="name"
          autoComplete="off"
          required
          className="name-input"
        />
        <span className="content-name">Nome</span>
      </label>
    );
  }
}

NameInput.propTypes = {
  onChange: func.isRequired,
};

export default NameInput;
