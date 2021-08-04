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
    const token = '5918261f2d6fc70c64c978ff9d93cf6d907ad70a6d3121bf01f8147eebe75314';
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
