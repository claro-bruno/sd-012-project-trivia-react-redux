import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      questions: [],
      loading: true,
    };

    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
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

  render() {
    const { questions, questionNumber, loading } = this.state;
    console.log(questions);
    if (!loading) {
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
      <p>Loading...</p>
    );
  }
}

export default Game;
