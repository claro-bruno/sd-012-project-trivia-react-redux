import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
    // const { getEndPoint } = this.props;
    this.handleData();
    // const endPonit = `https://www.gravatar.com/avatar/${hash}`;
    // getEndPoint(endPonit);
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
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imgem-do-avatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(HeaderGame);
