import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the first weapon you acquire in Half-Life?',
        correct_answer: 'A crowbar',
        incorrect_answers: ['A pistol', 'The H.E.V suit', 'Your fists'],
      },
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    const { questions, questionNumber } = this.props;
    const question = questions[questionNumber];
    this.setState({
      question,
    });
  }

  setAnswers() {
    const { question } = this.state;
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
    // this.setState((state) => ({
    //   questionNumber: state.questionNumber + 1,
    // }));
  }

  renderQuestions() {
    const { question } = this.state;
    const answers = this.setAnswers();
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

  render() {
    return <div>{this.renderQuestions()}</div>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  questionNumber: state.game.questionNumber,
});

GameQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameQuestions);
