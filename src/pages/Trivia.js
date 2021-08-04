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
    }
    this.setQuestions = this.setQuestions.bind(this);
  }

  setQuestions(questions) {
    this.setState({ questions, loading: false });
  }

  async componentDidMount() {
    const data = await fetchTrivia('5918261f2d6fc70c64c978ff9d93cf6d907ad70a6d3121bf01f8147eebe75314');
    const questions = data.results;
    this.setQuestions(questions);
  }

  render() {
    const { questions, questionNumber, loading } = this.state;
    console.log(questions)
    return (
      <section>
        {
          loading
            ? 'loading...'
            : <Question
                question={ questions[questionNumber] }
              />
        }
        
      </section>
    );
  }
}

export default Trivia;