import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Nome extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <label htmlFor="name-input" className="label-input">
        Nome:
        <input
          data-testid="input-player-name"
          id="name-input"
          name="name"
          type="text"
          onChange={ onChange }
        />
      </label>
    );
  }
}

Nome.propTypes = {
  onChange: PropTypes.func.isRequired,
};
