import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonSettings extends Component {
  render() {
    return (
      <Link to="/settings">
        <button
          type="button"
          data-testid="btn-settings"
          className="settings-btn"
        >
          Configurações
        </button>
      </Link>
    );
  }
}

export default ButtonSettings;
