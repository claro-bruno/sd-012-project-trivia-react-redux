import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    const pullScore = localStorage.getItem('state');
    const finalScore = JSON.parse(pullScore).player.score;
    this.state = {
      score: finalScore,
      redirect: false,
    };
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  redirectLogin() {
    this.setState({ redirect: true });
  }

  render() {
    const { score, redirect } = this.state;
    const { getUrl, getName } = this.props;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Header getUrl={ getUrl } getName={ getName } score={ score } />
        <p data-testid="feedback-text">Placeholder para requisito 11</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          Jogar Novamente
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getUrl: state.gravatar.url,
  getName: state.gravatar.name,
});

Feedback.propTypes = {
  getUrl: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
