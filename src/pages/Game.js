import React from 'react';

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

  getToken() {
    return localStorage.getItem('token');
  }

  getQuestions() {
    const token = this.getToken();
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((r) => r.json())
      .then((json) => this.setState({
        questions: json.results,
      }));
  }

  render() {
    const { questions, questionNumber } = this.state;

    return (
      <main>
        { (questions.length > 0)
          ? (
            <div>
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
            </div>
          ) : null }
      </main>
    );
  }
}

export default Game;
