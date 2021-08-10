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
      <header className="shadow-lg bg-header flex items-center justify-between pb-5 pt-5">
        <div className="flex items-center ml-5">
          <img
            data-testid="header-profile-picture"
            src={ pictureUrl }
            alt="avatar do jogador"
            className="rounded-2xl"
          />
          <span className="text-2xl aliceblue-color ml-4">
            Jogador:
            <span
              className="text-2xl aliceblue-color ml-1"
              data-testid="header-player-name"
            >
              {userName}
            </span>
          </span>
        </div>
        <div className="text-2xl aliceblue-color mr-5">
          <span>
            Pontuação:
            <span className="text-2xl aliceblue-color ml-1" data-testid="header-score">
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
