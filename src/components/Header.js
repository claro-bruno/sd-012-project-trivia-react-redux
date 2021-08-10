import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import { actionGetPictureUrl } from '../redux/actions';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      pictureUrl: '',
    };

    this.savePictureUrl = this.savePictureUrl.bind(this);
  }

  componentDidMount() {
    this.savePictureUrl();
  }

  savePictureUrl() {
    const { saveUrl, userMail } = this.props;
    const userMailHashCode = md5(userMail).toString();
    const pictureUrl = `https://www.gravatar.com/avatar/${userMailHashCode}`;

    this.setState({ pictureUrl });
    saveUrl(pictureUrl);
  }

  render() {
    const { userName, score } = this.props;
    const { pictureUrl } = this.state;

    return (
      <header className="standard-header">
        <div className="player-info">
          <img
            data-testid="header-profile-picture"
            src={ pictureUrl }
            alt="avatar do jogador"
            className="player-image"
          />
          <span className="jogador-span">
            Jogador:
            <span className="player-name" data-testid="header-player-name">
              {userName}
            </span>
          </span>
        </div>
        <div className="player-score">
          <span>
            Pontuação:
            <span className="player-score-number" data-testid="header-score">
              { score }
            </span>
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userMail: PropTypes.string,
  userName: PropTypes.string,
  userPoints: PropTypes.number,
  saveUrl: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userMail: state.loginReducer.email,
  score: state.gameReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveUrl: (url) => dispatch(actionGetPictureUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
