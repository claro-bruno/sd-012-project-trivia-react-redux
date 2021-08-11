import React, { Component } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  margin: 0 auto;
  width: 200px;
`;

class BadScore extends Component {
  render() {
    return (
      <div>
        <Image alt="bad score" src="https://www.pinclipart.com/picdir/big/71-716926_pikachu-clipart-yellow-imgenes-de-pikachu-sad-png.png" />
        <h1>You can do it better next time...</h1>
      </div>
    );
  }
}

export default BadScore;
