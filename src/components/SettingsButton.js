import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <Link to="/settings">
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

export default Settings;
