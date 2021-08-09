import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { Link } from 'react-router-dom';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      borderGreen: 'without',
      borderRed: 'without,',
      isDisable: false,
      timeCount: 30,
      isActive: false,
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.renderQuestionsApi = this.renderQuestionsApi.bind(this);
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    this.timer = setInterval(() => {
      const { timeCount } = this.state;
      const remainingTime = timeCount - 1;
      if (remainingTime >= 0) {
        this.setState({
          timeCount: remainingTime,
        });
      } else {
        this.setState({
          isActive: true,
        });
        this.stopTimer();
      }
    }, second);
  }

  handleAnswerButtonClick() {
    this.setState({
      borderGreen: 'border-green',
      borderRed: 'border-red',
      isActive: true,
    });
    return (this.stopTimer());
  }

  stopTimer() {
    this.setState({ isDisable: true });
    return (clearInterval(this.timer));
  }

  renderHeader() {
    const { userPlayer: { name, gravatarEmail } } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="Imagem Avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">0</h3>
      </header>
    );
  }

  renderQuestionsApi() {
    const { requestGameApi } = this.props;
    const { count, borderGreen, borderRed, isDisable, isActive } = this.state;
    const dataResults = requestGameApi.results;
    const incorrectAnswers = dataResults && dataResults
      .map((item) => item.incorrect_answers)[count];
    return (
      <>
        { dataResults && dataResults.map((item) => (
          <>
            <p data-testid="question-category">{ item.category }</p>
            <p data-testid="question-text">{ item.question }</p>
            <button
              type="button"
              data-testid="correct-answer"
              className={ borderGreen }
              disabled={ isDisable }
              onClick={ () => this.handleAnswerButtonClick() }
            >
              { item.correct_answer }
            </button>
          </>
        ))[count] }
        { incorrectAnswers && incorrectAnswers.map((item, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ borderRed }
            disabled={ isDisable }
            onClick={ () => this.handleAnswerButtonClick() }
          >
            { item }
          </button>
        )) }
        <div>
          { isActive ? (
            <Link to="/nextQuestion">
              <button
                type="button"
                data-testid="btn-next"
              >
                Próxima
              </button>
            </Link>
          ) : null}
        </div>
      </>
    );
  }

  render() {
    const { timeCount } = this.state;
    return (
      <div>
        <h1>Tela Jogo</h1>
        { this.renderHeader() }
        <p>
          {' '}
          { timeCount }
        </p>
        { this.renderQuestionsApi() }
      </div>
    );
  }
}

GameScreen.propTypes = {
  userPlayer: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  userPlayer: state.user.userInfo,
  requestGameApi: state.game.gameDataApi,
});

export default connect(mapStateToProps)(GameScreen);
