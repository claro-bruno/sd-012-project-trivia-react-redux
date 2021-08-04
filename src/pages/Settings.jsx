import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <>
        <h1 data-testid="settings-title">Configurações Trivia</h1>
        <p>Ainda não é possivel fazer configurações</p>
        <Link to="/">
          <button
            type="button"
          >
            Voltar ao Menu
          </button>
        </Link>
      </>
    );
  }
}

export default Settings;
