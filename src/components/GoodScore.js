import React, { Component } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  margin: 0 auto;
  width: 200px;
`;

class GoodScore extends Component {
  render() {
    return (
      <div>
        <Image
          src="https://www.clipartmax.com/png/full/426-4267156_pokemon-clip-art-happy-pikachu.png"
          alt="Congratulations!"
        />
        <h1>Congratulations!</h1>
      </div>
    );
  }
}

export default GoodScore;
