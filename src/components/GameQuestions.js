import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './GameQuestions.css';

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
      sortedAnswers: [],
      timer: 30,
      timerIntervalID: 0,
      canDisable: true,
      disableAnswers: false,
      cBtnClass: 'btn answer-btn',
      wBtnClass: 'btn answer-btn',
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
    }, () => this.setAnswers());
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

    const sortedAnswers = answers.sort((a, b) => a.id - b.id);
    this.setState({ sortedAnswers });
  }

  setTimer() {
    this.setState({ timer: 30, disableAnswers: false, canDisable: true });
    const timerStep = 1000;

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

  handleClick(answerStatus) {
    // No momento que essa função for chamada significa que a pessoa respondeu e o botão de proximo pode aparacer
    this.setState({
      cBtnClass: 'btn answer-btn-correct',
      wBtnClass: 'btn answer-btn-wrong',
    });

    if (answerStatus === 'correct') {
      // implementar comportamento quando acertar a pergunta
    }
    if (answerStatus === 'wrong') {
      // implementar comportamento quando errar a pergunta.
    }
  }

  renderQuestions() {
    const { question, disableAnswers, sortedAnswers, cBtnClass, wBtnClass } = this.state;
    const answers = sortedAnswers;
    return (
      <div className="questions-card">
        <div className="questions-text">
          <span className="cat" data-testid="question-category">{question.category}</span>
          <span data-testid="question-text">{question.question}</span>
        </div>
        <div className="questions-answers">
          {answers.map((answer, index) => {
            if (answer.isCorrect) {
              return (
                <button
                  className={ cBtnClass }
                  key={ index }
                  data-testid="correct-answer"
                  type="button"
                  disabled={ disableAnswers }
                  onClick={ () => {
                    this.handleClick('correct');
                  } }
                >
                  { answer.answer }
                </button>
              );
            }
            return (
              <button
                className={ wBtnClass }
                key={ index }
                data-testid={ `wrong-answer-${index}` }
                type="button"
                disabled={ disableAnswers }
                onClick={ () => {
                  this.handleClick('wrong');
                } }
              >
                { answer.answer }
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { timer } = this.state;

    return (
      <div className="questions-container">
        { this.renderQuestions()}
        <div>
          <p>{ `Tempo: ${timer}` }</p>
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
