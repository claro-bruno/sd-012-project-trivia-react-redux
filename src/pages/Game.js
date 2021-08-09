import React from 'react';
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
      loading: true,
      seconds: 30,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.changeBordersColor = this.changeBordersColor.bind(this);
    this.timer = this.timer.bind(this);
    this.buttonColorDisabler = this.buttonColorDisabler.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.timer();
  }

  getQuestions() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json())
      .then((json) => this.setState({
        questions: [...json.results], loading: false,
      }));
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

  buttonColorDisabler() {
    const correctAnswerButton = document.getElementsByClassName('c-answer');
    correctAnswerButton[0].style.border = '3px solid rgb(6, 240, 15)';
    correctAnswerButton[0].setAttribute('disabled', 'disabled');

    const incorrectAnswerButton = document.querySelectorAll('.w-answer');
    incorrectAnswerButton.forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
      button.setAttribute('disabled', 'disabled');
    });
  }

  changeBordersColor() {
    this.setState({
      corrAnsBorder: { border: '3px solid rgb(6, 240, 15)' },
      incorrAnsBorder: { border: '3px solid rgb(255, 0, 0)' },
    });
  }

  render() {
    const { questions,
      questionNumber, loading, incorrAnsBorder, corrAnsBorder, seconds } = this.state;
    if (!loading) {
      return (
        <main>
          <Header />
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
          <span>{ seconds }</span>
        </main>
      );
    }
    return (
      <Loading />
    );
  }
}

export default Game;
