import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { fetchTrivia } from '../services/api';
import Loading from '../components/Loading';
import { changeUserAssertions, changeUserScore } from '../redux/actions';

const ONE_SECOND = 1000;

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      loading: true,
      resolved: false,
      timeCounter: 30,
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderQuestionOrRedirect = this.renderQuestionOrRedirect.bind(this);

    this.countDown = this.countDown.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  async componentDidMount() {
    // Token de teste, para funcionar de verdade o token verdadeiro tem de ser retirado do localStorage e colocado aqui
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    const data = await fetchTrivia(token);
    const questions = data.results;
    this.setQuestions(questions);

    this.countDown();
  }

  setQuestions(questions) {
    this.setState({ questions, loading: false });
  }

  getResult(value) {
    const { timeCounter } = this.state;
    const DEFAULT_VALUE = 10;
    const { score, assertions, changeScore, changeAssertions } = this.props;
    const result = DEFAULT_VALUE + (timeCounter * value);
    changeScore(score + result);
    changeAssertions(assertions + 1);
    const userInfos = JSON.parse(localStorage.getItem('state'));
    localStorage.setItem('state', JSON.stringify({ player: {
      ...userInfos.player,
      score: score + result,
      assertions: assertions + 1,
    },
    }));
  }

  countDown() {
    this.timer = setInterval(() => {
      const { timeCounter } = this.state;
      const remainingTime = timeCounter - 1;
      if (remainingTime >= 0) {
        this.setState({
          timeCounter: remainingTime,
        });
      } else {
        this.stopTimer();
      }
    }, ONE_SECOND);
  }

  handleAnswer(isCorrect) {
    this.setState({ resolved: true });
    this.stopTimer();

    const { questions, questionNumber } = this.state;
    const currentQuestion = questions[questionNumber];

    if (isCorrect) {
      const { difficulty } = currentQuestion;

      if (difficulty === 'easy') {
        this.getResult(1);
      } else if (difficulty === 'medium') {
        this.getResult(2);
      } else {
        const HARD_VALUE = 3;
        this.getResult(HARD_VALUE);
      }
    }
  }

  handleNext() {
    this.setState((prevState) => (
      {
        resolved: false,
        questionNumber: prevState.questionNumber + 1,
        timeCounter: 30,
      }));
    this.countDown();
  }

  stopTimer() {
    this.setState({ resolved: true });
    return (clearInterval(this.timer));
  }

  renderQuestionOrRedirect() {
    const { handleAnswer } = this;
    const { questionNumber, resolved, questions, timeCounter } = this.state;

    const maxQuestionsNumber = 4;
    const currentQuestion = questions[questionNumber];
    return (questionNumber > maxQuestionsNumber
      ? <Redirect to="/game/feedback" />
      : (
        <Question
          timeCounter={ timeCounter }
          handleAnswer={ handleAnswer }
          resolved={ resolved }
          question={ currentQuestion }
        />));
  }

  render() {
    const { loading, resolved, timeCounter } = this.state;
    const { handleNext, renderQuestionOrRedirect } = this;
    return (
      <section>
        {
          loading
            ? <Loading />
            : renderQuestionOrRedirect()
        }
        {
          (resolved || timeCounter === 0)
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ handleNext }
              >
                Pŕoxima
              </button>)
        }
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeScore: (userScore) => dispatch(changeUserScore(userScore)),
  changeAssertions: (userAssertions) => dispatch(changeUserAssertions(userAssertions)),
});

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Trivia.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
