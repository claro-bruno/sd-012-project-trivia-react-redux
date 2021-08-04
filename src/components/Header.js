import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: 'https://www.gravatar.com/avatar/',
    };
  }

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ profilePicture: `https://www.gravatar.com/avatar/${hash}` });
  }

  render() {
    const { name, score } = this.props;
    const { profilePicture } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ profilePicture }
          alt="foto-perfil"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.trivia.score,
  email: state.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
