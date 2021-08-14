import React, { PureComponent } from 'react';
import PlayAgainButton from '../components/PlayAgainButton';

class Settings extends PureComponent {
  render() {
    return (
      <section className="setting-page">
        <h1 className="main-text" data-testid="settings-title">
          Acredite, o jogo já está difícil demais!
        </h1>
        <PlayAgainButton />
      </section>
    );
  }
}

export default Settings;
