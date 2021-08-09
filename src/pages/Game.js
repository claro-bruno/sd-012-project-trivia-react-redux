import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 0,
      questions: [],
      corrAnsBorder: {},
      incorrAnsBorder: {},
      loading: true,
      score: 0,
      assertions: 0,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.changeBordersColor = this.changeBordersColor.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
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

  changeBordersColor(click) {
    this.setState({
      corrAnsBorder: { border: '3px solid rgb(6, 240, 15)' },
      incorrAnsBorder: { border: '3px solid rgb(255, 0, 0)' },
    });
    this.getScore(click);
  }

  render() {
    const { questions, score,
      questionNumber, loading, corrAnsBorder, incorrAnsBorder } = this.state;
    const { getUrl, getName } = this.props;
    if (!loading) {
      return (
        <main>
          <Header
            getUrl={ getUrl }
            getName={ getName }
            score={ score }
          />
          <div>
            <p data-testid="question-category">{ questions[questionNumber].category }</p>
            <p data-testid="question-text">{ questions[questionNumber].question }</p>
          </div>
          <div>
            { questions[questionNumber]
              .incorrect_answers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  name="incorrect"
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
              id={ questions[questionNumber].difficulty }
              name="correct"
              difficulty={ questions[questionNumber].difficulty }
              style={ corrAnsBorder }
              onClick={ this.changeBordersColor }
            >
              { questions[questionNumber].correct_answer }
            </button>
          </div>
        </main>
      );
    }
    return (<p>Loading...</p>);
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
