import React from 'react';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Span from './Span';
import Img from './Img';

class Header extends React.Component {
  constructor() {
    super();
    this.createHash = this.createHash.bind(this);
  }

  createHash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    return hash;
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <header>
        <Img
          srcImg={ `https://www.gravatar.com/avatar/${this.createHash()}` }
          descriptionImg="Avatar do usuário"
          testId="header-profile-picture"
        />
        <p />
        <Span
          textContent={ user }
          testId="header-player-name"
        />
        <Span
          textContent="0"
          testId="header-score"
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.emailReducer.email,
  user: state.nameReducer.user,
});

Span.propTypes = {
  textContent: string.isRequired,
};

Header.propTypes = {
  email: string.isRequired,
  user: string.isRequired,
};

export default connect(mapStateToProps)(Header);
