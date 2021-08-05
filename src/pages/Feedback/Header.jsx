import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { userName, userimg, score } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="gravatar" src={ userimg } />
        <h1 data-testid="header-player-name">{ userName }</h1>
        <h1>
          Pontuação:
          <span data-testid="header-score">{ score }</span>
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userimg: state.user.img,
  userScore: state.user.score,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userimg: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
