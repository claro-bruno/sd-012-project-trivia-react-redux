import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UniqueButton from './UniqueButton';
import Button from './Button';
import { scorePlayer } from '../redux/actions';
import './questioninfo.css';

const ANSWERED_QUESTION = 'Respondida!';

class QuestionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      seconds: 30,
      disabled: false,
    };

    this.changeButtonVisibility = this.changeButtonVisibility.bind(this);
    this.resetQuestions = this.resetQuestions.bind(this);
    this.count = this.count.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.answeredQuestion = this.answeredQuestion.bind(this);
  }

  componentDidMount() {
    this.count();
  }

  count() {
    const sec = 1000;
    const interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      });
      if (seconds === 1) {
        clearInterval(interval);
        this.setState({
          seconds: 'Time\'s Up',
          disabled: true,
        });
      } else if (seconds === ANSWERED_QUESTION) {
        clearInterval(interval);
        this.setState({
          seconds: ANSWERED_QUESTION,
        });
      }
    }, sec);
  }

  changeButtonVisibility() {
    const buttonNextQuestion = document.getElementsByClassName('btn-next')[0];
    buttonNextQuestion.classList.add('visible');
    const correct = document.getElementById('correct-answer');
    const incorrect = document.getElementsByName('incorrect-answer');
    incorrect.forEach((question) => { question.className += ' questionWrong'; });
    correct.className += ' questionCorrect';
  }

  resetQuestions() {
    const correct = document.getElementById('correct-answer');
    const incorrect = document.getElementsByName('incorrect-answer');
    incorrect.forEach((question) => question.classList.remove('questionWrong'));
    correct.classList.remove('questionCorrect');
    this.setState((p) => ({ index: p.index + 1 }));
  }

  answeredQuestion() {
    this.setState({
      seconds: ANSWERED_QUESTION,
    });
  }

  resetTimer() {
    this.setState({
      seconds: 30,
    });
  }

  sumUserPoints() {
    const basePoints = 10;
    const { questions, addScore } = this.props;
    const { seconds, index } = this.state;
    const difficultyMultiplier = () => {
      if (questions[index].difficulty === 'easy') {
        return 1;
      }
      if (questions[index].difficulty === 'medium') {
        return 2;
      }
      if (questions[index].difficulty === 'hard') {
        const hardMultiplier = 3;
        return hardMultiplier;
      }
    };
    const points = basePoints + (seconds * difficultyMultiplier());
    const locals = JSON.parse(localStorage.getItem('state'));
    localStorage.setItem('state', JSON.stringify({
      player: {
        ...locals.player,
        assertions:
        locals.player.assertions + 1,
        score: locals.player.score + points } }));
    addScore(locals.player.score + points);
  }

  renderQuestions() {
    const { questions } = this.props;
    const { index } = this.state;
    const { question } = questions[index];
    const fixedQuestion = question
      .replace(/&quot;/gi, '')
      .replace(/&#039;/gi, '')
      .replace(/&eacute/gi, '')
      .replace(/&amp/gi, '');
    return fixedQuestion;
  }

  render() {
    const { index, seconds, disabled } = this.state;
    const { questions } = this.props;
    const finalQuestion = 5;
    if (index === finalQuestion) return <Redirect to="/feedback" />;
    return (
      <div className="question-container">
        <div className="timer"><span>{seconds}</span></div>
        <p className="question-category" data-testid="question-category">
          <span className="category">Category:</span>
          {`${questions[index].category}`}
        </p>
        <p data-testid="question-text" className="question-text">
          <span className="question">Question:</span>
          {`${this.renderQuestions()}`}
        </p>
        <UniqueButton
          disabled={ disabled }
          className="correct-answer"
          onClick={ () => {
            this.changeButtonVisibility();
            this.sumUserPoints();
            this.answeredQuestion();
          } }
          innerText={ questions[index].correct_answer }
        />
        {questions[index].incorrect_answers.map((incorrect, i) => (
          <Button
            className="incorrect-answer"
            key={ i }
            dataTestId={ `wrong-answer-${i}` }
            onClick={ () => {
              this.changeButtonVisibility();
              this.answeredQuestion();
            } }
            innerText={ incorrect }
          />))}
        <UniqueButton
          className="btn-next"
          innerText="PRÓXIMA"
          onClick={ () => {
            this.resetQuestions();
            this.resetTimer();
            this.count();
          } }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addScore: (score) => dispatch(scorePlayer(score)),
});

QuestionInfo.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  addScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(QuestionInfo);
