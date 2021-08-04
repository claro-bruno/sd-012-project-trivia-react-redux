import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      questions: [],
      corrAnsBorder: {},
      incorrAnsBorder: {},
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.changeBordersColor = this.changeBordersColor.bind(this);
    this.renderFalseAnswers = this.renderFalseAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json())
      .then((json) => this.setState({
        questions: json.results,
      }));
  }

  changeBordersColor() {
    this.setState({
      corrAnsBorder: { border: '3px solid rgb(6, 240, 15)' },
      incorrAnsBorder: { border: '3px solid rgb(255, 0, 0)' },
    });
  }

  renderFalseAnswers() {
    const { corrAnsBorder, incorrAnsBorder } = this.state;

    return (
      <div>
        <Header />
        <p data-testid="question-category">o</p>
        <p data-testid="question-text">o</p>
        <button
          type="button"
          data-testid={ `wrong-answer-${0}` }
          onClick={ this.changeBordersColor }
          style={ incorrAnsBorder }
        >
          a
        </button>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.changeBordersColor }
          style={ corrAnsBorder }
        >
          o
        </button>
      </div>
    );
  }

  render() {
    const { questions, questionNumber, corrAnsBorder, incorrAnsBorder } = this.state;
    if (questions.length > 0) {
      return (
        <main>
          <Header />
          <div>
            <p data-testid="question-category">
              { questions[questionNumber].category }
            </p>
            <p data-testid="question-text">
              { questions[questionNumber].question }
            </p>
          </div>
          <div>
            { questions[questionNumber]
              .incorrect_answers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  style={ incorrAnsBorder }
                  onClick={ this.changeBordersColor }
                >
                  { answer }
                </button>
              )) }
            <button
              type="button"
              data-testid="correct-answer"
              style={ corrAnsBorder }
              onClick={ this.changeBordersColor }
            >
              { questions[questionNumber].correct_answer }
            </button>
          </div>
        </main>
      );
    }
    return (
      <main>
        { this.renderFalseAnswers() }
      </main>
    );
  }
}

export default Game;
