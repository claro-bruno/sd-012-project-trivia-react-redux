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
  }

  async getQuestions() {
    const questions = await getApiQuestions(
      '423c45738670ab2752468b0125b89688ccffc8afe0df4d3bfb2c6e79621391e3'
    );
    console.log(questions);
    this.setState({
      questions,
      isLoading: false,
    });
  }

  handleClick() {
    this.setState((state) => {
      return {
        questionNumber: state.questionNumber + 1,
      };
    });
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    const { questions, questionNumber, isLoading } = this.state;
    const question = questions[questionNumber];

    if (isLoading) {
      return <span>Carregando</span>;
    }

    return (
      <div>
        <div>
          <span data-testid="question-category">{question.category}</span>
          <span data-testid="question-text">{question.question}</span>
          <button
            data-testid="correct-answer"
            type="button"
            onClick={() => {
              this.handleClick();
            }}
          >
            {question.correct_answer}
          </button>
          {question.incorrect_answers.map((answer, index) => (
            <button
              data-testid={`wrong-answer-${index}`}
              type="button"
              onClick={() => {
                this.handleClick();
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default GameQuestions;
