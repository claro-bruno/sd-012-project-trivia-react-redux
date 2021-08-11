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
            className="img-gravatar"
            src={ gravatarImage }
            alt="user gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{userName}</p>
        </div>
        <p className="score-counter" data-testid="header-score">
<<<<<<< HEAD
          Score:
=======
>>>>>>> 2b57f82e84f6843eb795d4b4f4a49bb091f0bbe9
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
