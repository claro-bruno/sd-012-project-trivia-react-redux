import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.hash = this.hash.bind(this);
  }

  hash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    return hash;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header className="header">
        <img
          className="header-things"
          src={ `https://www.gravatar.com/avatar/${this.hash()}` }
          alt="Player"
          data-testid="header-profile-picture"
        />
        <div data-testid="header-player-name" className="header-things">{ name }</div>
        <div data-testid="header-score" className="header-things">{ score }</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.questions.score,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
