import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Question from '../components/Question';
import { fetchTrivia } from '../services/api';
import Loading from '../components/Loading';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      loading: true,
      resolved: false,
    };
    this.setQuestions = this.setQuestions.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderQuestionOrRedirect = this.renderQuestionOrRedirect.bind(this);
  }

  async componentDidMount() {
    // Token de teste, para funcionar de verdade o token verdadeiro tem de ser retirado do localStorage e colocado aqui
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    const data = await fetchTrivia(token);
    const questions = data.results;
    this.setQuestions(questions);
  }

  setQuestions(questions) {
    this.setState({ questions, loading: false });
  }

  handleAnswer() {
    this.setState({ resolved: true });
  }

  handleNext() {
    this.setState((prevState) => (
      {
        resolved: false,
        questionNumber: prevState.questionNumber + 1,
      }));
  }

  renderQuestionOrRedirect() {
    const { handleAnswer } = this;
    const { questionNumber, resolved, questions } = this.state;

    const maxQuestionsNumber = 4;
    const currentQuestion = questions[questionNumber];
    return (questionNumber > maxQuestionsNumber
      ? <Redirect to="/game/feedback" />
      : (
        <Question
          handleAnswer={ handleAnswer }
          resolved={ resolved }
          question={ currentQuestion }
        />));
  }

  render() {
    const { loading, resolved } = this.state;
    const { handleNext, renderQuestionOrRedirect } = this;
    return (
      <section>
        {
          loading
            ? <Loading />
            : renderQuestionOrRedirect()
        }
        {
          resolved
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
