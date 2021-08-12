import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetScore, willPlayAgain, fetchQuestions } from '../actions';
import { Header, Mp3 } from '../components';
import acertoupouco from '../audio/acertoupouco.ogg';
import foibem from '../audio/foibem.ogg';
import './Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.restartGame = this.restartGame.bind(this);
    this.resetScoreStorage = this.resetScoreStorage.bind(this);
    this.rankingScreen = this.rankingScreen.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);

    this.state = { option: '' };
  }

  componentDidMount() {
    const { getCustomQuestionsHandler } = this.props;
    const { lastConfig } = sessionStorage;
    const { token } = localStorage;
    getCustomQuestionsHandler(lastConfig, token);
  }

  restartGame() {
    const { resetScoreHandler, willPlayAgainHandler } = this.props;
    resetScoreHandler();
    willPlayAgainHandler();
    this.resetScoreStorage();
    this.setState({ option: 'restart' });
  }

  rankingScreen() {
    const { resetScoreHandler } = this.props;
    resetScoreHandler();
    this.setState({ option: 'ranking' });
  }

  resetScoreStorage() {
    const retrieve = JSON.parse(localStorage.getItem('state'));
    retrieve.player.assertions = 0;
    retrieve.player.score = 0;
    localStorage.state = JSON.stringify(retrieve);
  }

  storeDataToRanking(name, score, picture) {
    const TOKEN_ADJUST = 5;
    const token = picture.split('/', TOKEN_ADJUST)[4];
    const newData = { name, score, picture };
    if ('ranking' in localStorage) {
      const prevData = JSON.parse(localStorage.getItem('ranking'));
      prevData.forEach((data, index) => {
        const compareToken = data.picture.split('/', TOKEN_ADJUST)[4];
        if (token === compareToken) prevData.splice(index, 1);
      });
      localStorage.setItem('ranking', JSON.stringify([...prevData, newData]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([newData]));
    }
  }

  renderButtons() {
    return (
      <div>
        <div className="play-again-container" data-testid="btn-play-again">
          <button
            type="button"
            className="play-again material-icons"
            onClick={ () => this.restartGame() }
          >
            replay_circle_filled
          </button>
          <button
            type="button"
            className="play-again-label"
            onClick={ () => this.restartGame() }
          >
            JOGAR NOVAMENTE
          </button>
          <button
            type="button"
            className="play-again material-icons"
            onClick={ () => this.restartGame() }
          >
            extension
          </button>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.rankingScreen() }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }

  renderFeedback() {
    const { player: { name, gravatarEmail, score, assertions } } = this.props;
    const AVERAGE = 3;

    this.storeDataToRanking(name, score, gravatarEmail);

    return (
      <div className="feedback-container">
        <Header
          name={ name }
          gravatar={ gravatarEmail }
          score={ score }
          assertions={ assertions }
          toRender="feedback"
        />
        <h1 className="feedback-message" data-testid="feedback-text">
          { assertions >= AVERAGE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <div>
          { assertions >= AVERAGE ? (
            <Mp3 musicPath={ foibem } />

          ) : (
            <Mp3 musicPath={ acertoupouco } />

          ) }

        </div>
        { this.renderButtons() }
      </div>
    );
  }

  render() {
    const { option } = this.state;
    switch (option) {
    case 'restart': return <Redirect to="/game" />;
    case 'ranking': return <Redirect to="ranking" />;
    default: return this.renderFeedback();
    }
  }
}

const mapStateToProps = (state) => ({ player: state.player });

const mapDispatchToProps = (dispatch) => ({
  resetScoreHandler: () => dispatch(resetScore()),
  willPlayAgainHandler: () => dispatch(willPlayAgain()),
  getCustomQuestionsHandler: (config, token) => dispatch(fetchQuestions(config, token)),
});

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
  resetScoreHandler: PropTypes.func.isRequired,
  willPlayAgainHandler: PropTypes.func.isRequired,
  getCustomQuestionsHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
