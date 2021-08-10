import React from 'react';
import { string, func } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Span from './Span';
import Img from './Img';
import '../App.css';
import { actionHash } from '../redux/actions';

class Header extends React.Component {
  constructor() {
    super();
    this.createHash = this.createHash.bind(this);
  }

  getScore() {
    const score = localStorage.getItem('state');
    return <h4 data-testid="header-score">{score}</h4>;
  }

  createHash() {
    const { email, setHash } = this.props;
    const hash = md5(email).toString();
    setHash(hash);
    // localStorage.setItem('hash', hash);
    return hash;
  }

  render() {
    const { user, score, className } = this.props;
    // const { user } = this.props;
    // const scoreValue = localStorage.getItem('state');
    // console.log(score);
    return (
      <header className={ className }>
        <div className="containerLogo">
          <Img
            logoAvatar="logoAvatar"
            srcImg={ `https://www.gravatar.com/avatar/${this.createHash()}` }
            descriptionImg="Avatar do usuário"
            testId="header-profile-picture"
          />
        </div>
        <p />
        <p className="user" data-testid="header-player-name">{user}</p>
        <span
          className="score"
          data-testid="header-score"
        >
          Score:
          {' '}
          { score }
        </span>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.emailReducer.email,
  user: state.nameReducer.user,
  score: state.scoreReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  setHash: (hash) => dispatch(actionHash(hash)),
});

Span.propTypes = {
  textContent: string.isRequired,
};

Header.propTypes = {
  email: string.isRequired,
  user: string.isRequired,
  score: string.isRequired,
  className: string.isRequired,
  setHash: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
