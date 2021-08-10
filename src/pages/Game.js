import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
      disabled: false,
      score: 0,
      assertions: 0,
    };

    this.renderQuestions = this.renderQuestions.bind(this);
    this.setCounter = this.setCounter.bind(this);
    this.scoreCounter = this.scoreCounter.bind(this);
    this.assertionsCounter = this.assertionsCounter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Requisito 8 - para fazer foi consultado essa vídeo-aula: https://www.youtube.com/watch?v=NAx76xx40jM

  componentDidMount() {
    this.setCounter();
  }

  // chamado sempre q o estado muda
  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.myInterval);
    }
    this.setLocalStorageGame();
    console.log(this.state);
  }

  setCounter() {
    const ONE_SECOND = 1000;

    this.myInterval = setInterval(() => {
      const { count } = this.state;
      if (count === 1) {
        this.setState((prevState) => ({
          count: prevState.count - 1,
          disabled: true,
        }));
      } else {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      }
    }, ONE_SECOND);
  }

  setLocalStorageGame() {
    const { assertions, score } = this.state;
    const { name, gravatarEmail } = this.props;

    const objeto = JSON.stringify({ player: { name, gravatarEmail, assertions, score } });
    localStorage.setItem('state', objeto);
  }

  handleClick({ target: { value: difficulty, name } }) {
    if (name === 'correct') {
      this.scoreCounter(difficulty);
      this.assertionsCounter();
    }
    // this.setLocalStorageGame();

    this.setState({
      disabled: true,
    });
  }

  scoreCounter(difficulty) {
    const { /* score, */ count } = this.state;

    const questionLevel = { hard: 3, medium: 2, easy: 1 };
    const DEFAULT_NUMBER = 10;
    const newScore = DEFAULT_NUMBER + (count * questionLevel[difficulty]);

    // return (newScore);
    this.setState((prevState) => ({
      score: prevState.score + newScore,
    }));
  }

  assertionsCounter() {
    const { assertions } = this.state;
    this.setState({
      assertions: assertions + 1,
    });
  }

  // logica baseada no seguinte repositorio https://github.com/tryber/sd-012-project-trivia-react-redux/pull/8/commits/a93062a005d249fcc708168294a7926669bbf914
  renderQuestions() {
    const { triviaQuest } = this.props;
    const { count, disabled } = this.state;

    return (
      <div>
        <p data-testid="question-category">
          { triviaQuest[0].category }
        </p>
        <p data-testid="question-text">
          { triviaQuest[0].question }
        </p>
        <button
          type="button"
          data-testid="correct-answer"
          name="correct"
          value={ triviaQuest[0].difficulty }
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          { triviaQuest[0].correct_answer }
        </button>
        {
          triviaQuest[0].incorrect_answers.map((key, index) => (
            <button
              type="button"
              data-testid={ `wrong-answer-${index}` }
              name="incorrect"
              value={ triviaQuest[0].difficulty }
              disabled={ disabled }
              onClick={ this.handleClick }
              key={ key }
            >
              { key }
            </button>
          ))
        }

        <h3>
          Tempo:
          { count }
        </h3>
      </div>
    );
  }

  render() {
    const { triviaQuest } = this.props;
    // console.log(triviaQuest);
    const firstQuestion = triviaQuest[0];
    return (
      <section>
        <Header />
        { firstQuestion ? this.renderQuestions() : <p>LOADING</p> }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuest: state.questions.questions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
