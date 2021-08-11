import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

const NUMBER_OF_QUESTIONS = 3;
class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getScoreLocalStorage = this.getScoreLocalStorage.bind(this);
    this.state = {
      score: 0,
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

  renderMessage() {
    const { assertions } = this.state;
    if (assertions < NUMBER_OF_QUESTIONS) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  render() {
    const { name, gravatarEmail } = this.props;
    const email = md5(gravatarEmail).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${email}`;

    const { score/* , assertions */ } = this.state;
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
            {/* { console.log(score) } */}
          </span>
        </header>

        <div>
          { this.renderMessage() }
        </div>
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
