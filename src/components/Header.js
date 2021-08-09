import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { savePicture } from '../redux/actions/login';
import '../styles/header.css';

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
    const { name, score, setURL } = this.props;
    const url = `https://www.gravatar.com/avatar/${this.hash()}`;
    setURL(url);
    return (
      <header>
        <div className="profile">
          <img
            className="profile-pic"
            src={ url }
            alt="Player"
            data-testid="header-profile-picture"
          />
          <div data-testid="header-player-name" className="player-name">Nome</div>
        </div>
        <div data-testid="header-score" className="score">{ score }</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.questions.score,
});

const mapDispatchToProps = (dispatch) => ({
  setURL: (url) => dispatch(savePicture(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  saveURL: PropTypes.func,
}.isRequired;
