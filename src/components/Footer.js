import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>
          <span>Desenvolvido por </span>
          <a href="https://www.linkedin.com/in/camila-malvessi-6b3367110/" target="_blank" rel="noopener noreferrer"> Bernardo, </a>
          <a href="https://www.linkedin.com/in/felipelouzeiro/" target="_blank" rel="noopener noreferrer"> Caio, </a>
          <a href="https://www.linkedin.com/in/guilherme-hermenegildo-junior/" target="_blank" rel="noopener noreferrer"> Guilherme, </a>
          <a href="https://caiomorato.github.io/portfolio/" target="_blank" rel="noopener noreferrer"> Nuwanda e </a>
          <a href="https://www.rslfilho.com.br/" target="_blank" rel="noopener noreferrer"> Roberval</a>
          <span> usando React.js e Tailwind CSS - Bloco 17 - </span>
          <a href="http://www.betrybe.com.br/" target="_blank" rel="noopener noreferrer">Trybe</a>
        </p>
      </div>
    );
  }
}

export default Footer;
