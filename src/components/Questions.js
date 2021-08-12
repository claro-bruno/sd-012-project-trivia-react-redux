import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// logica baseada no seguinte repositorio https://github.com/tryber/sd-012-project-trivia-react-redux/pull/8/commits/a93062a005d249fcc708168294a7926669bbf914

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
      disabled: false,
      score: 0,
      assertions: 0,
      questionNumber: 0,
    };

    this.setCounter = this.setCounter.bind(this);
    this.scoreCounter = this.scoreCounter.bind(this);
    this.assertionsCounter = this.assertionsCounter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.setCounter();
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.myInterval);
    }
    this.setLocalStorageGame();
  }

  setLocalStorageGame() {
    const { assertions, score } = this.state;
    const { name, gravatarEmail } = this.props;

    const storageObj = JSON.stringify({
      player: { name, gravatarEmail, assertions, score },
    });
    localStorage.setItem('state', storageObj);
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

  assertionsCounter() {
    const { assertions } = this.state;
    this.setState({
      assertions: assertions + 1,
    });
  }

  scoreCounter(difficulty) {
    const { count } = this.state;
    const questionLevel = { hard: 3, medium: 2, easy: 1 };
    const DEFAULT_NUMBER = 10;
    const newScore = DEFAULT_NUMBER + (count * questionLevel[difficulty]);

    this.setState((prevState) => ({
      score: prevState.score + newScore,
    }));
  }

  handleClick({ target: { value: difficulty, name } }) {
    if (name === 'correct') {
      this.scoreCounter(difficulty);
      this.assertionsCounter();
    }
    this.changeColorAnswer();

    this.setState({
      disabled: true,
    });
  }

  render() {
    const { questionNumber, count, disabled, handleClick, triviaQuest } = this.props;
    return (
      <div>
        <p data-testid="question-category">
          { triviaQuest[questionNumber].category }
        </p>
        <p data-testid="question-text">
          { triviaQuest[questionNumber].question }
        </p>
        <button
          id="correct"
          type="button"
          data-testid="correct-answer"
          name="correct"
          value={ triviaQuest[questionNumber].difficulty }
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          { triviaQuest[questionNumber].correct_answer }
        </button>
        {
          triviaQuest[questionNumber].incorrect_answers.map((key, index) => (
            <button
              id="incorrect"
              type="button"
              data-testid={ `wrong-answer-${index}` }
              name="incorrect"
              value={ triviaQuest[questionNumber].difficulty }
              disabled={ disabled }
              onClick={ handleClick }
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
}

Questions.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  triviaQuest: state.questions.questions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Questions);
