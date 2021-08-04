import React, { Component } from 'react';
import Question from '../components/Question';
import { fetchTrivia } from '../services/api';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    }
    this.setQuestions = this.setQuestions.bind(this);
  }

  setQuestions(questions) {
    this.setState({ questions });
  }

  async componentDidMount() {
    const data = await fetchTrivia('5918261f2d6fc70c64c978ff9d93cf6d907ad70a6d3121bf01f8147eebe75314');
    const questions = data.results;
    this.setQuestions(questions);
  }

  render() {
    const { questions } = this.state;
    return (
      <section>
        { questions.map((question) => <Question question={ question } />)}
      </section>
    );
  }
}

export default Trivia;