import React, { Component } from 'react';

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

export default ConfigButton;
