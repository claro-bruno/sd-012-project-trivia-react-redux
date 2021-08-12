import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUpdateScore } from '../actions';
import { Header, Question, Mp3 } from '../components';
import * as api from '../services/api';
import * as util from '../util/util';
import './Game.css';
import quemquerserabertura from '../audio/quemquerserabertura.mp3';
import acertou from '../audio/acertou.ogg';
import errou from '../audio/errou.ogg';
import tempoacabou from '../audio/tempoacabou.ogg';

const TIMER = 30;
const MAX_QUESTIONS = 4;
const CORRECT = 'correct-answer';
const ACERTOU = 'acertou';
const ERROU = 'errou';
const ESGOTOU = 'esgotou';

class Game extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.prepareTrivia = this.prepareTrivia.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.setCustomQuestions = this.setCustomQuestions.bind(this);
    this.switchMusic = this.switchMusic.bind(this);

    this.state = {
      questions: [],
      question: 0,
      isTiming: false,
      isPlaying: false,
      timer: TIMER,
      soundEffect: '',
    };
  }

  componentDidMount() {
    const { game: { configuration } } = this.props;
    if (configuration === 'default') {
      api.fethApi().then((questions) => {
        this.setState({ questions });
      });
    }
    if (configuration === 'custom') this.setCustomQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isPlaying, isTiming, timer, questions } = this.state;

    if (prevState.questions !== questions && prevState.questions.length === 0) {
      this.prepareTrivia();
    }
    if (isPlaying && isTiming) this.startTimer();
    if (timer === 0) {
      this.stopTimer('end');
      util.disableAnswers(true);
      util.changeColor(true);
    }
  }

  setCustomQuestions() {
    const { game: { questions } } = this.props;
    this.setState({ questions });
  }

  prepareTrivia() {
    const { questions } = this.state;
    const formatedQuestions = util.formatQuestions(questions);
    this.setState({
      questions: formatedQuestions,
      isTiming: true,
      isPlaying: true,
    });
  }

  startTimer() {
    const SECOND = 1000;
    this.setState({ isTiming: false, isPlaying: true });
    this.gameTimer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, SECOND);
  }

  resetTimer() {
    const { question } = this.state;
    this.setState({ timer: TIMER });
    if (question < MAX_QUESTIONS) this.startTimer();
  }

  stopTimer(type) {
    clearInterval(this.gameTimer);
    console.log(typeof type);
    if (type === 'end') {
      this.setState({
        timer: 'Tempo ESGOTADO!',
        soundEffect: ESGOTOU,
      });
    }
  }

  submitAnswer({ target: { className, id } }) {
    const { timer } = this.state;
    util.disableAnswers(true);
    util.changeColor(true);
    this.stopTimer();
    if (className.split(' ', 2)[1] === CORRECT) {
      this.calculateScore(timer, id);
      this.setState({
        timer: 'ACERTOU!',
        soundEffect: ACERTOU,
      });
      util.adjustTimerStyle(true);
    } else {
      this.setState({
        timer: 'ERROU!',
        soundEffect: ERROU,
      });
      util.adjustTimerStyle(true);
    }
  }

  calculateScore(timer, difficultyLevel) {
    const { setUpdateScoreHandler } = this.props;
    const calculatedScore = util.calculateScore(timer, difficultyLevel);
    setUpdateScoreHandler({ score: calculatedScore });
  }

  changeQuestion() {
    util.disableAnswers(false);
    util.changeColor(false);
    util.adjustTimerStyle(false);
    this.resetTimer();
    this.setState((prevState) => ({
      question: prevState.question + 1,
      soundEffect: '',
    }));
  }

  switchMusic() {
    const { soundEffect } = this.state;
    switch (soundEffect) {
    case ACERTOU:
      return (<Mp3 musicPath={ acertou } />);
    case ERROU:
      return (<Mp3 musicPath={ errou } />);
    case ESGOTOU:
      return (<Mp3 musicPath={ tempoacabou } />);
    default:
      return <> </>;
    }
  }

  renderGame() {
    const { questions, question, timer } = this.state;
    const { player: { name, gravatarEmail, score } } = this.props;

    return (
      <div className="game-container">
        {/* <ReactAudioPlayer /> */}
        <Mp3 musicPath={ quemquerserabertura } />
        <div className="game-header">
          <h1 className="title">TRIVIA</h1>
          <div className="next-container">
            <button
              data-testid="btn-next"
              type="button"
              className="next material-icons"
              onClick={ () => this.changeQuestion() }
            >
              arrow_forward_ios
            </button>
          </div>
        </div>
        <Header
          name={ name }
          gravatar={ gravatarEmail }
          score={ score }
          toRender="game"
        />
        <Question
          questions={ questions }
          question={ question }
          timer={ timer }
          submitAnswer={ this.submitAnswer }
        />
        { this.switchMusic() }
      </div>
    );
  }

  render() {
    const { isPlaying } = this.state;
    if (isPlaying) return this.renderGame();
    return (<> </>);
  }
}

const mapStateToProps = (state) => ({ player: state.player, game: state.game });

const mapDispatchToProps = (dispatch) => ({
  setUpdateScoreHandler: (scoreInfo) => dispatch(setUpdateScore(scoreInfo)),
});

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  game: PropTypes.shape({
    configuration: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  setUpdateScoreHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
