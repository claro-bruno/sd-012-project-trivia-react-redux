import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../trivia.png';
import LoginForm from '../components/LoginForm';

const Logo = styled.img`
  margin: 0 auto;
  margin-bottom: 2rem;
  pointer-events: none;
  width: 250px;

  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  border-radius: 50%;

  @keyframes rotate{
    from{
      transform: rotate(-360deg) scale(1);
    }
    to{
      transform: rotate(360deg) scale(1.2);
    }
}
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 27.5rem;
  margin-left: auto;
  margin-right: auto;
  background-color: hsl(218, 28%, 13%);
  padding: 4rem 2rem;
  border-radius: 0.375rem;
`;

const Title = styled.img`
  margin: 0 auto;
  margin-bottom: 2rem;
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

class LoginPage extends Component {
  render() {
    return (
      <Main>
        <Container>
          <Title
            src="https://media.discordapp.net/attachments/872170473901920328/875141650429644880/Untitled_Artwork.png?width=1440&height=534"
            alt="Pikahoot"
          />
          <Logo src={ logo } alt="Trivia" />
          <LoginForm />
        </Container>
      </Main>
    );
  }
}

export default LoginPage;
