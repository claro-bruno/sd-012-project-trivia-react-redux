import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../trivia.png';
import LoginForm from '../components/LoginForm';

const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media ( prefers-reduced-motion : no-preference ) {
    animation: shake infinite 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
  
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
  
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
  
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

const Main = styled.main`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: 100vh;
`;

class LoginPage extends Component {
  render() {
    return (
      <Main>
        <Logo src={ logo } alt="Trivia" />
        <LoginForm />
      </Main>
    );
  }
}

export default LoginPage;
