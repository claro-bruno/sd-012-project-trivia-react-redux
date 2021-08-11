import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { HeaderWrapper, HeaderText, Div } from './styles';
import { Tittle } from '../globalStyles';

class Header extends React.Component {
  render() {
    const { name, email, totalScore } = this.props;
    return (
      <HeaderWrapper>
        <Div>
          <HeaderText>Pontos:</HeaderText>
          <span data-testid="header-score">
            <HeaderText>{ totalScore }</HeaderText>
          </span>
        </Div>
        <Tittle>Trivia</Tittle>
        <Div>
          <label htmlFor="user-name">
            <HeaderText
              id="user-name"
              data-testid="header-player-name"
            >
              {name}
            </HeaderText>
          </label>
          <img src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` } style={ { borderRadius: '50%', width: '5vw' } } alt={ name } data-testid="header-profile-picture" />
        </Div>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.user.email,
  name: state.userReducer.user.name,
  totalScore: state.scoreReducer.totalScore,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
