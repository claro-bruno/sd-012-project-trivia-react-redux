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
    };
    this.setQuestions = this.setQuestions.bind(this);
  }

  async componentDidMount() {
    const data = await fetchTrivia();
    const questions = data.results;
    this.setQuestions(questions);
  }

  setQuestions(questions) {
    this.setState({ questions, loading: false });
  }

  render() {
    const { questions, questionNumber, loading } = this.state;
    console.log(questions);
    return (
      <section>
        {
          loading
            ? 'loading...'
            : <Question question={ questions[questionNumber] } />
        }
      </section>
    );
  }
}

export default Trivia;
