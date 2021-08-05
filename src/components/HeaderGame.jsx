import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './HeaderGame.css';

class HeaderGame extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      email: '',
      name: '',
      score: 0,
    };
  }

  componentDidMount() {
    this.handleData();
  }

  handleData() {
    const { user: { email, name } } = this.props;
    this.setState({
      email,
      name,
    });
  }

  render() {
    const { email } = this.state;
    const hash = md5(email).toString().toLowerCase();
    const { name, score } = this.state;
    return (
      <>
        <img
          className="profile-image"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imgem-do-avatar"
        />

        <h3
          className="Player-name"
          data-testid="header-player-name"
        >
          {name}
        </h3>

        <h2
          className="score"
          data-testid="header-score"
        >
          {score}
        </h2>
      </>
    );
  }
}

HeaderGame.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(HeaderGame);
