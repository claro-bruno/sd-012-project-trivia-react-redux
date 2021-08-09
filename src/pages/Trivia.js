import React, { Component } from 'react';
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
  }

  async componentDidMount() {
    // Token de teste, para funcionar de verdade o token verdadeiro tem de ser retirado do localStorage e colocado aqui
    const token = 'ddf55f6e70dcfd16a28529486e7f4a580da6500246de72c750c393ef92fc16e7';
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

  render() {
    const { questions, questionNumber, loading, resolved } = this.state;
    const { handleAnswer, handleNext } = this;
    const currentQuestion = questions[questionNumber];
    return (
      <section>
        {
          loading
            ? <Loading />
            : (
              <Question
                handleAnswer={ handleAnswer }
                resolved={ resolved }
                question={ currentQuestion }
              />)
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
