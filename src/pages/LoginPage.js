import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../trivia.png';
import LoginForm from '../components/LoginForm';

const Logo = styled.img`
  pointer-events: none;
  margin-bottom: 1rem;

  @media ( prefers-reduced-motion : no-preference ) {
    animation: shake infinite 1.125s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-2px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(2px, 0, 0);
    }
  }
`;

const Main = styled.main`
  margin-top: 2rem;
  padding: 1rem;
`;

const Container = styled.div`
  max-width: 27.5rem;
  margin-left: auto;
  margin-right: auto;
  background-color: hsl(218, 28%, 13%);
  padding: 4rem 2rem;
  border-radius: 0.375rem;
`;

class LoginPage extends Component {
  render() {
    return (
      <Main>
        <Container>
          <Logo src={ logo } alt="Trivia" />
          <LoginForm />
        </Container>
      </Main>
    );
  }
}

export default LoginPage;
