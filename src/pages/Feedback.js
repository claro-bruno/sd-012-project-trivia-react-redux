import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';

const NUMBER_OF_QUESTIONS = 3;
class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getScoreLocalStorage = this.getScoreLocalStorage.bind(this);
    this.handlePlayAgainClick = this.handlePlayAgainClick.bind(this);

    this.state = {
      score: 0,
      assertions: 0,
      playAgain: false,
    };
  }

  componentDidMount() {
    this.getScoreLocalStorage();
  }

  getScoreLocalStorage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    this.setState({ score, assertions });
    // console.log(score);
  }

  handlePlayAgainClick() {
    this.setState({
      playAgain: true,
    });
  }

  renderMessage() {
    const { assertions } = this.state;
    if (assertions < NUMBER_OF_QUESTIONS) {
      return (
        <h2 data-testid="feedback-text">Podia ser melhor...</h2>
      );
    }
    return (
      <h2 data-testid="feedback-text">Mandou bem!</h2>
    );
  }

  render() {
    const { name, gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${email}`;
    const { score, assertions, playAgain } = this.state;

    if (playAgain) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ urlGravatar }
            alt="Imagem do jogador"
          />
          <p data-testid="header-player-name">
            { name }
          </p>
          <p>Final score:</p>
          <span data-testid="header-score">
            { score }
          </span>
        </header>

        <div>
          { this.renderMessage() }
          <p>Respostas corretas:</p>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
          <p>Pontuação total:</p>
          <p data-testid="feedback-total-score">
            { score }
          </p>
        </div>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handlePlayAgainClick }
        >
          Play again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
