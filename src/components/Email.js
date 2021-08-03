import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Email extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <label htmlFor="email-input" className="label-input">
        E-mail:
        <input
          data-testid="input-gravatar-email"
          id="email-input"
          type="email"
          name="email"
          onChange={ onChange }
        />
      </label>
    );
  }
}

Email.propTypes = {
  onChange: PropTypes.func.isRequired,
};
