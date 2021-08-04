import React from 'react';
import { getApiQuestions } from '../services/triviaApi';

class GameQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionNumber: 0,
      isLoading: true,
    };

    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const questions = await getApiQuestions(
      '53ff0223bf164dccf048d124e43ee2a57fce744ca0c6cb8f1afcfefe4cd5d807',
    );
    this.setState({
      questions,
      isLoading: false,
    });
  }

  setAnswers(question) {
    const incorrectAnswers = question.incorrect_answers.map((answer) => ({
      answer,
      isCorrect: false,
      id: Math.random(),
    }));
    const answers = [
      {
        answer: question.correct_answer,
        isCorrect: true,
        id: Math.random(),
      },
      ...incorrectAnswers,
    ];
    return answers.sort((a, b) => a.id - b.id);
  }

  handleClick() {
    this.setState((state) => ({
      questionNumber: state.questionNumber + 1,
    }));
  }

  renderQuestions() {
    const { isLoading } = this.state;
    if (!isLoading) {
      const { questions, questionNumber } = this.state;
      const question = questions[questionNumber];
      const answers = this.setAnswers(question);
      return (
        <div>
          <span data-testid="question-category">{question.category}</span>
          <span data-testid="question-text">{question.question}</span>
          {answers.map((answer, index) => {
            if (answer.isCorrect) {
              return (
                <button
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  onClick={ () => {
                    this.handleClick();
                  } }
                >
                  { answer.answer }
                </button>
              );
            }
            return (
              <button
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                type="button"
                onClick={ () => {
                  this.handleClick();
                } }
              >
                { answer.answer }
              </button>
            );
          })}
        </div>
      );
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <span>Carregando</span>;
    }

    return <div>{this.renderQuestions()}</div>;
  }
}

export default GameQuestions;
