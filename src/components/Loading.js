import React, { Component } from 'react';
import styled from 'styled-components';
import LoadingSVG from '../SVG/Loading.svg';

const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const SVG = styled.img`
  width: 100px;
`;

class Loading extends Component {
  render() {
    return (
      <Main>
        <SVG src={ LoadingSVG } alt="Loading" />
      </Main>
    );
  }
}

export default Loading;
