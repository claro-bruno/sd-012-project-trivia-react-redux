import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              src={ `https://www.gravatar.com/avatar/${hash}` }
              data-testid="header-profile-picture"
              alt="Avatar"
            />
          </span>
          <span
            className="navbar-brand mb-0 h1"
            data-testid="header-player-name"
          >
            { name }
          </span>
          <span
            className="navbar-brand mb-0 h1"
            data-testid="header-score"
          >
            { score }
          </span>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.quizReducer.score,
});

export default connect(mapStateToProps, null)(Header);
