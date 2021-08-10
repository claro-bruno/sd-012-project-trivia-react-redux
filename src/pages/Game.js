import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../services/api';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getScore } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      questionIndex: 0,
      disableButton: false,
      answered: false,
      assertions: 0,
      timer: 30,
      score: 10,
    };

    this.getQuestions1 = this.getQuestions1.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.score = this.score.bind(this);
    this.saveOnLocalStorage = this.saveOnLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getQuestions1();
    this.saveOnLocalStorage();
  }

  async getQuestions1() {
    const results = await getQuestions();

    this.setState({ questions: results });
    return results;
  }

  buttonEnable(bool) {
    this.setState({
      disableButton: bool,
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      answered: false,
    }));
  }

  score(question) {
    const { dispatchScore } = this.props;
    const timer = document.getElementById('timer').innerHTML;
    const dificuldade = () => {
      const saida = 3;
      switch (question.difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return saida;
      default:
        return null;
      }
    };
    this.setState((prevState) => ({
      score: prevState.score + (timer * dificuldade()),
      assertions: prevState.assertions + 1,
      answered: true,
    }), () => {
      const { score, assertions } = this.state;
      console.log(score);
      this.saveOnLocalStorage();
      dispatchScore(assertions, score);
    });
  }

  saveOnLocalStorage() {
    const { score, assertions } = this.state;
    const info = {
      assertions,
      score,
    };
    localStorage.setItem('state', JSON.stringify({ player: info }));
  }

  renderQuestions() {
    const { questions, timer, answered, questionIndex } = this.state;
    const questionFilter = questions.filter((category) => questions
      .indexOf(category) === questionIndex);

    return (
      questionFilter.map((quest, index) => (
        <div key={ index } className="questions">
          <Timer
            timer={ timer }
            answered={ answered }
            index={ questionIndex }
          />
          <h3 data-testid="question-category">{quest.category}</h3>
          <p data-testid="question-text">{quest.question}</p>
          <button
            type="button"
            data-testid="correct-answer"
            className="correct-answer-btn"
            id="correct-btn"
            onClick={ () => this.score(quest) }
          >
            {quest.correct_answer}
          </button>
          {quest.incorrect_answers.map((wrong, index1) => (
            <button
              data-testid={ `wrong-answer-${index1}` }
              key={ index1 }
              type="button"
              className="incorrect-answer-btn"
              onClick={ () => this.setState({ answered: true }) }
            >
              {wrong}
            </button>
          ))}
        </div>
      ))
    );
  }

  render() {
    const { questionIndex, disableButton, answered, score } = this.state;
    const limit = 5;

    // https://github.com/tryber/sd-010-a-project-trivia-react-redux/pull/600/
    // commits/6c6c13f6c3fdfb09f19cf9f33f6e8cd814b7bd04
    return (
      <div>
        <Header score={ score } />
        {this.renderQuestions()}
        {questionIndex === limit ? (
          <Redirect to="/feedback" />
        ) : (
          <ButtonNextQuestion
            disableButton={ disableButton }
            answered={ answered }
            onClick={ () => this.nextQuestion() }
            index={ questionIndex }
          />
        )}

        <Link to="/feedback">
          <button data-testid="feedbackButton" type="button">Feedback</button>
        </Link>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (value, score) => dispatch(getScore(value, score)),
});

export default connect(null, mapDispatchToProps)(Game);

Game.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
};
