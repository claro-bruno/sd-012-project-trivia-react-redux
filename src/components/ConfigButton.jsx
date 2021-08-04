import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConfigButton extends Component {
  render() {
    return (
      <Link to="/config">
        <button
          data-testid="btn-settings"
          type="button"
        >
          Configurações
        </button>
      </Link>
    );
  }
}

export default ConfigButton;
