import React from 'react';
import Header from '../components/Header';

class Config extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="settings-title">Configurações</h2>
      </div>
    );
  }
}

export default Config;
