import React, { Component } from 'react';
import Footer from '../components/Footer';

class Config extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <Footer />
      </div>
    );
  }
}

export default Config;
