import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userMail, userName } = this.props;
    const playerData = JSON.parse(localStorage.getItem('state'));
    const userMailHashCode = md5(userMail).toString();
    return (
      <header className="shadow-lg bg-header flex items-center justify-between pb-5 pt-5">
        <div className="flex items-center ml-5">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${userMailHashCode}` }
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
              {playerData ? playerData.score : 0}
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
}.isRequired;

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userMail: state.loginReducer.email,
});

export default connect(mapStateToProps)(Header);
