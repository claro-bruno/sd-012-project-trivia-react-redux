import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      questions: [],
    };

    this.getQuestions = this.getQuestions.bind(this);
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

  render() {
    const { questions, questionNumber } = this.state;
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
                >
                  { answer }
                </button>
              )) }
            <button
              type="button"
              data-testid="correct-answer"
            >
              { questions[questionNumber].correct_answer }
            </button>
          </div>
        </main>
      );
    }
    return (
      <main>
        <Header />
        <p data-testid="question-category">o</p>
        <p data-testid="question-text">o </p>
        <button type="button" data-testid={ `wrong-answer-${0}` }>a</button>
        <button type="button" data-testid="correct-answer">o</button>
      </main>
    );
  }
}

export default Game;
