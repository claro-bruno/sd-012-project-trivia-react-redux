import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGravatarImage } from '../services/api';
import '../Style/headerInGame.css';

class HeaderInGame extends Component {
  constructor() {
    super();
    this.state = {
      gravatarImage: '',
    };
    this.handleGetUserGravatarImage = this.handleGetUserGravatarImage.bind(this);
  }

  componentDidMount() {
    this.handleGetUserGravatarImage();
  }

  async handleGetUserGravatarImage() {
    const { userEmail } = this.props;
    const gravatarImage = await fetchGravatarImage(userEmail);
    this.setState({ gravatarImage });
  }

  render() {
    const { gravatarImage } = this.state;
    const { userName, userScore } = this.props;
    return (
      <div className="userInfos">
        <div className="left-side-infos">
          <img
            id="img-gravatar"
            src={ gravatarImage }
            alt="user gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{userName}</p>
        </div>
        <p id="score-counter" data-testid="header-score">
          Score:
          {userScore}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  userEmail: player.user.email,
  userName: player.user.name,
  userScore: player.score,
});

HeaderInGame.propTypes = {
  userEmail: PropTypes.string,
  userName: PropTypes.string,
  userScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(HeaderInGame);
