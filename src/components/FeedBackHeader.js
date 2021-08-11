import React, { Component } from 'react';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Span from './Span';
import Img from './Img';
import '../App.css';

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

  checkFinal() {
    const three = 3;
    const { assertions } = this.props;
    console.log(assertions);
    if (assertions < three) {
      return (
        <h3
          className="review-feedback"
          data-testId="feedback-text"
        >
          Podia ser melhor...
        </h3>
      );
    }
    if (assertions >= three) {
      return <h3 className="review-feedback" data-testId="feedback-text">Mandou bem!</h3>;
    }
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <Img
          logoAvatar="img-feedback"
          srcImg={ `https://www.gravatar.com/avatar/${this.createHash()}` }
          descriptionImg="Avatar do usuário"
          testId="header-profile-picture"
        />
        <p
          className="user-feedback"
          data-testid="header-player-name"
        >
          {user}
        </p>

        { this.checkFinal() }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.emailReducer.email,
  user: state.nameReducer.user,
  score: state.scoreReducer.score,
  assertions: state.assertionsReducer.assertions,
});

Span.propTypes = {
  textContent: string.isRequired,
};

FeedBackHeader.propTypes = {
  email: string.isRequired,
  user: string.isRequired,
  assertions: string.isRequired,
};

export default connect(mapStateToProps)(FeedBackHeader);
