import React from 'react';
import { requestTrivia } from '../../services/index';
import Question from './Question';

class Trivia extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };

    this.showQuestions = this.showQuestions.bind(this);
  }

  async componentDidMount() {
    const data = await requestTrivia('easy');
    const questions = data.results;
    this.showQuestions(questions);
  }

  showQuestions(questions) {
    this.setState({
      questions,
    });
  }

  render() {
    const { questions } = this.state;
    return <Question questions={ questions } />;
  }
}

export default Trivia;
