import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const email = md5('email@email.com').toString();

class Header extends React.Component {
  render() {
    const {
      props: { name, score } } = this;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${email}` } alt="Player avatar" />
        <h2 data-testid="header-player-name">{ `User: ${name}` }</h2>
        <aside data-testid="header-score">{ `Score: ${score}` }</aside>
      </header>
    );
  }
}

const {
  string,
  number,
} = PropTypes;

Header.propTypes = {
  name: string.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStateToProps)(Header);
// !
