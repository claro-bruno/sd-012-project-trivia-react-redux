import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const {
      props: { score, getLogin: { user, email } },
    } = this;

    const profile = md5(email).toString();
    const SRC = `https://www.gravatar.com/avatar/${profile}`;

    return (
      <header>
        <img data-testid="header-profile-picture" src={ SRC } alt="Player avatar" />
        <h2 data-testid="header-player-name">{ `User: ${user}` }</h2>
        <aside data-testid="header-score">{ `Score: ${score}` }</aside>
      </header>
    );
  }
}

const {
  objectOf,
  string,
  number,
} = PropTypes;

Header.propTypes = {
  getLogin: objectOf(string).isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({
  getLogin: state.addLoginReducer,
});

export default connect(mapStateToProps, null)(Header);
