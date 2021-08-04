import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfigButton extends Component {
  render() {
    const { push } = this.props;
    return (
      <button
      type="button"
      data-testid="btn-settings"
      onClick={ () => {
        push('/configs');
      } }
    >
      Configurações
    </button>
    );
  }
}

ConfigButton.propTypes = {
  push: PropTypes.func.isRequired,
};

export default ConfigButton;
