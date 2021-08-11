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
          src="https://www.pinclipart.com/picdir/big/45-453116_shocked-happy-cliparts-co-awesome-face-no-background.png"
          alt="Congratulations!"
        />
        <h1>Congratulations!</h1>
      </div>
    );
  }
}

export default GoodScore;
