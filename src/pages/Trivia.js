import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Question from '../components/Question';
import { fetchTrivia } from '../services/api';
import Loading from '../components/Loading';

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

    // this.timer = setInterval(() => {
    //   const { timeCounter } = this.state;
    //   const remainingTime = timeCounter - 1;
    //   if (remainingTime >= 0) {
    //     this.setState({
    //       timeCounter: remainingTime,
    //     });
    //   } else {
    //     // this.setState({ resolved: false });
    //     this.stopTimer();
    //   }
    // }, ONE_SECOND);
    this.countDown();
  }

  setQuestions(questions) {
    this.setState({ questions, loading: false });
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

  handleAnswer() {
    this.setState({ resolved: true });
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

export default Trivia;
