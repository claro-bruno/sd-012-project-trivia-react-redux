import React, { Component } from 'react';
import { func } from 'prop-types';

class EmailInput extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <label
        htmlFor="input-gravatar-email"
        className="label-email"
      >
        <input
          type="email"
          id="input-gravatar-email"
          data-testid="input-gravatar-email"
          onChange={ onChange }
          name="email"
          className="email-input"
          autoComplete="off"
          required
        />
        <span className="content-email">Email</span>
      </label>
    );
  }
}

EmailInput.propTypes = {
  onChange: func.isRequired,
};

export default EmailInput;
