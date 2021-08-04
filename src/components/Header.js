import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
    this.handleGravatar = this.handleGravatar.bind(this);
    this.handleGetItem = this.handleGetItem.bind(this);
  }

  componentDidMount() {
    this.handleGetItem();
  }

  handleGetItem() {
    const userName = localStorage.getItem('userName');
    this.setState({ userName });
  }

  handleGravatar() {
    const { userEmail } = this.props;
    return md5(userEmail).toString();
  }

  render() {
    const { userName } = this.state;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${this.handleGravatar()}` }
          alt={ userName }
          data-testid="header-profile-picture"
        />
          <input type="text" aria-readonly data-testid="header-player-name"  value={` ${userName} `} />

        <input type="text" aria-readonly data-testid="header-score" value={0} />
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.trivia.email,
});
export default connect(mapStateToProps)(Header);
