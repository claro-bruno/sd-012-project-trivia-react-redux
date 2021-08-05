import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GameQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      question: {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the first weapon you acquire in Half-Life?',
        correct_answer: 'A crowbar',
        incorrect_answers: ['A pistol', 'The H.E.V suit', 'Your fists'],
      },
      timer: 30,
      timeIsRunning: false,
      timerIntervalID: 0,
      canDisable: true,
      disableAnswers: false,
    };

    this.getQuestion = this.getQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
    this.setTimer();
  }

  componentDidUpdate() {
    const { timer, timerIntervalID } = this.state;
    if (timer <= 0) {
      clearInterval(timerIntervalID);
      this.disableAnswers();
    }
  }

  getQuestion() {
    const { questionNumber } = this.state;
    const { questions } = this.props;
    const question = questions[questionNumber];
    this.setState({
      question,
    });
  }

  setAnswers() {
    const { question, timeIsRunning } = this.state;
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
    return timeIsRunning ? answers : answers.sort((a, b) => a.id - b.id);
  }

  setTimer() {
    this.setState({ timer: 30 });
    const timerStep = 1000;
    const timeFirstRender = 150;

    setTimeout(() => {
      this.setState({ timeIsRunning: true });
    }, timeFirstRender);

    const timerIntervalID = setInterval(() => {
      this.setState((previousState) => ({ timer: previousState.timer - 1 }));
    }, timerStep);

    this.setState({ timerIntervalID });
  }

  disableAnswers() {
    const { canDisable } = this.state;
    if (canDisable) {
      this.setState({ disableAnswers: true, canDisable: false });
    }
  }

  handleClick() {
    // this.setState((state) => ({
    //   questionNumber: state.questionNumber + 1,
    // }));
  }

  renderQuestions() {
    const { question, disableAnswers } = this.state;
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
                disabled={ disableAnswers }
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
              disabled={ disableAnswers }
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
    const { timer } = this.state;

    return (
      <div>
        { this.renderQuestions()}
        <div>
          <p>Tempo: </p>
          <p>{ timer }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

GameQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(GameQuestions);
