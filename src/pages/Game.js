import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      questions: [],
      corrAnsBorder: {},
      incorrAnsBorder: {},
      next: false,
      loading: true,
      score: 0,
      assertions: 0,
      seconds: 30,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.getScore = this.getScore.bind(this);
    this.timer = this.timer.bind(this);
    this.buttonColorDisabler = this.buttonColorDisabler.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.timer();
  }

  componentDidUpdate() {
    const { getUrl, getName } = this.props;
    const { assertions, score } = this.state;

    const value = {
      player: {
        name: getName,
        assertions,
        score,
        gravatarEmail: getUrl,
      },
    };
    const myValue = JSON.stringify(value);
    localStorage.setItem('state', myValue);
  }

  getQuestions() {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json())
      .then((json) => this.setState({
        questions: [...json.results],
        loading: false,
      }));
  }

  getScore(question) {
    const { id, name } = question.target;
    const { assertions, score } = this.state;
    const right = 10;
    const notas = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    switch (name) {
    case 'correct': switch (id) {
    case 'hard': this.setState({
      score: (score + right + notas.hard),
      assertions: (assertions + 1),
    });
      break;
    case 'medium': this.setState({
      score: (score + right + notas.medium),
      assertions: (assertions + 1),
    });
      break;
    case 'easy': this.setState({
      score: (score + right + notas.easy),
      assertions: (assertions + 1),
    });
      break;
    default:
    }
      break;
    default:
    }
  }

  timer() {
    const interval = 1000;
    const limit = 30000;
    setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) this.setState({ seconds: seconds - 1 });
    }, interval);
    setTimeout(() => {
      this.buttonColorDisabler();
    }, limit);
  }

  buttonColorDisabler(click) {
    const correctAnswerButton = document.getElementsByClassName('c-answer');
    correctAnswerButton[0].style.border = '3px solid rgb(6, 240, 15)';
    correctAnswerButton[0].setAttribute('disabled', 'disabled');

    const incorrectAnswerButton = document.querySelectorAll('.w-answer');
    incorrectAnswerButton.forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
      button.setAttribute('disabled', 'disabled');
    });
    this.setState({
      next: true,
    });
    this.getScore(click);
  }

  render() {
    const { questions,
      questionNumber, loading,
      incorrAnsBorder, score, corrAnsBorder, seconds, next } = this.state;
      const { getUrl, getName } = this.props;
    if (!loading) {
      return (
        <main>
          <Header
            getUrl={ getUrl }
            getName={ getName }
            score={ score }
          />
          <Paper elevation={ 3 }>
            <p data-testid="question-category">
              { questions[questionNumber].category }
            </p>
            <p data-testid="question-text">
              { questions[questionNumber].question }
            </p>
            <div>
              { questions[questionNumber]
                .incorrect_answers.map((answer, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    style={ incorrAnsBorder }
                    onClick={ this.buttonColorDisabler }
                    className="w-answer"
                  >
                    { answer }
                  </button>
                )) }
              <button
                type="button"
                data-testid="correct-answer"
                style={ corrAnsBorder }
                onClick={ this.buttonColorDisabler }
                className="c-answer"
              >
                { questions[questionNumber].correct_answer }
              </button>
            </div>
            {next ? <button type="button" data-testid="btn-next">Próxima</button> : null}
          </Paper>
          <span>{ seconds }</span>
        </main>
      );
    }
    return (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  getUrl: state.gravatar.url,
  getName: state.gravatar.name,
});

Game.propTypes = {
  getUrl: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Game);
