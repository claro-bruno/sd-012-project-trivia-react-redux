import React, { Component } from 'react';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Span from './Span';
import Img from './Img';

class FeedBackHeader extends Component {
  constructor() {
    super();
    this.createHash = this.createHash.bind(this);
  }

  getScore() {
    const score = localStorage.getItem('state');
    return (
      <h4 data-testid="header-score">
        your score:
        {' '}
        {score}
      </h4>
    );
  }

  createHash() {
    const { email } = this.props;
    const hash = md5(email).toString();
    return hash;
  }

  render() {
    const { user, score } = this.props;
    return (
      <header>
        <Img
          srcImg={ `https://www.gravatar.com/avatar/${this.createHash()}` }
          descriptionImg="Avatar do usuário"
          testId="header-profile-picture"
        />
        <p />
        <Span
          textContent={ user }
          testId="header-player-name"
        />
        <span>{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.emailReducer.email,
  user: state.nameReducer.user,
  score: state.scoreReducer.score,
});

Span.propTypes = {
  textContent: string.isRequired,
};

FeedBackHeader.propTypes = {
  email: string.isRequired,
  score: string.isRequired,
  user: string.isRequired,
};

export default connect(mapStateToProps)(FeedBackHeader);
