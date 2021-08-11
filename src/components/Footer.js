import React, { Component } from 'react';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div
        className="footer
        bg-header text-center py-3 absolute bottom-0 w-screen text-white"
      >
        <p>
          <span>Desenvolvido por </span>
          <a href="https://github.com/Bernardo-Coelho-Cezario/" target="_blank" rel="noopener noreferrer">
            Bernardo
          </a>
          ,
          {' '}
          <a href="https://github.com/caio-cesar-lopes/" target="_blank" rel="noopener noreferrer">
            Caio
          </a>
          ,
          {' '}
          <a href="https://www.linkedin.com/in/guilherme-hermenegildo-junior/" target="_blank" rel="noopener noreferrer">
            Guilherme
          </a>
          ,
          {' '}
          <a href="https://caiomorato.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
            Nuwanda
          </a>
          {' '}
          e
          {' '}
          <a href="https://www.rslfilho.com.br/" target="_blank" rel="noopener noreferrer">
            Roberval
          </a>
          <span> usando React.js e Tailwind CSS - Bloco 17 - </span>
          <a href="http://www.betrybe.com.br/" target="_blank" rel="noopener noreferrer">Trybe</a>
        </p>
      </div>
    );
  }
}

export default Footer;
