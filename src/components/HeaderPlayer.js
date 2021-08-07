import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 60rem) {
    margin-bottom: 4rem;
  }
`;

const Avatar = styled.img`
  border: 3px solid white;
  width: 2.5rem;

  @media (min-width: 60rem) {
    width: 5rem;
  }
`;

class HeaderPlayer extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score, name, gravatarEmail } = state.player;
    const hash = md5(gravatarEmail).toString();

    return (
      <Header>
        <Avatar src={ `https://www.gravatar.com/avatar/${hash}` } alt="Avatar" data-testid="header-profile-picture" />
        <div>
          <p>
            <span data-testid="header-score">{score}</span>
            {' '}
            pontos
          </p>
          <p data-testid="header-player-name">{ name }</p>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(HeaderPlayer);
