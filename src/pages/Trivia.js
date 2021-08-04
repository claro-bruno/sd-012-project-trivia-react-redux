import React, { Component } from 'react';
import Question from '../components/Question';
import { fetchTrivia } from '../services/api';

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
  }

  async componentDidMount() {
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

  render() {
    const { questions, questionNumber, loading, resolved } = this.state;
    const { handleAnswer } = this;
    const currentQuestion = questions[questionNumber];
    return (
      <section>
        {
          loading
            ? 'loading...'
            : (
              <Question
                handleAnswer={ handleAnswer }
                resolved={ resolved }
                question={ currentQuestion }
              />)
        }
      </section>
    );
  }
}

export default Trivia;
