import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pictureUpdate } from '../redux/actions/gameActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: 'https://www.gravatar.com/avatar/',
    };

    this.getProfilePicture = this.getProfilePicture.bind(this);
  }

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture() {
    const { email, savePicture } = this.props;
    const hash = md5(email).toString();
    const pictureUrl = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ profilePicture: pictureUrl });
    savePicture(pictureUrl);
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
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  savePicture: (state) => dispatch(pictureUpdate(state)),
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  savePicture: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
