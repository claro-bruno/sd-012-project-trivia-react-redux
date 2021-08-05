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
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.changeBordersColor = this.changeBordersColor.bind(this);
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

  changeBordersColor() {
    this.setState({
      corrAnsBorder: { border: '3px solid rgb(6, 240, 15)' },
      incorrAnsBorder: { border: '3px solid rgb(255, 0, 0)' },
    });
  }

  render() {
    const { questions,
      questionNumber, loading, corrAnsBorder, incorrAnsBorder } = this.state;
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
          </Paper>
        </main>
      );
    }
    return (
      <Loading />
    );
  }
}

export default Game;
