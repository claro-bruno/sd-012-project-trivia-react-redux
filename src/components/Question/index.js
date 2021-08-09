import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GenericBtn from '../GenericBtn';
import { savePlayerAtRanking, setNewScore } from '../../utils/player';
import { nextQuestion, currentScore, addAssertion } from '../../redux/actions';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      currQuestion: {},
      seconds: 30,
    };

    this.handleNext = this.handleNext.bind(this);
    this.showRank = this.showRank.bind(this);
    this.timerOver = this.timerOver.bind(this);
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.timerId = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      }, () => {
        const { seconds: newSecond } = this.state;
        if (!newSecond) {
          this.timerOver();
          clearInterval(this.timerId);
        }
      });
    }, ONE_SECOND);
  }

  answerQuestion(correct) {
    const { seconds } = this.state;
    clearInterval(this.timerId);
    const BASE_POINTS = 10;
    const scoreLevels = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { questions, qIndex, addScore, addOneAssertion } = this.props;
    const { difficulty } = questions[qIndex];
    const addPoint = correct ? BASE_POINTS + (scoreLevels[difficulty] * seconds) : 0;
    if (correct) {
      setNewScore(addPoint);
      addOneAssertion();
    }

    this.setState({ answered: true }, () => addScore(addPoint));
  }

  handleNext() {
    const { next, questions, qIndex } = this.props;
    clearInterval(this.timerId);
    this.setState({
      answered: false,
      seconds: 30,
    }, () => {
      next();
      this.startTimer();
      this.setState({ currQuestion: questions[qIndex + 1] });
    });
  }

  showRank() {
    savePlayerAtRanking();
    this.setState({ currQuestion: undefined });
  }

  timerOver() {
    this.setState({
      answered: true,
    });
  }

  componentDidMount() {
    const { questions, qIndex } = this.props;
    this.startTimer();
    this.setState({ currQuestion: questions[qIndex] });
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { currQuestion, answered, seconds } = this.state;
    const { questions, qIndex } = this.props;
    const lastQuestion = questions.length === qIndex + 1;

    if (!currQuestion) return <Redirect to="/feedback" />;
    if (!currQuestion.category) return <h1>Loading...</h1>;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      category,
      question,
    } = currQuestion;

    return (
      <section>
        {seconds}
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        {incorrectAnswers.map((answer, i) => (
          <GenericBtn
            key={ answer }
            id={ `wrong-answer-${i}` }
            style={ answered ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            onClick={ () => this.answerQuestion(false) }
            disabled={ answered }
            value={ answer }
          />

        ))}
        <GenericBtn
          id="correct-answer"
          style={ answered ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ () => this.answerQuestion(true) }
          disabled={ answered }
          value={ correctAnswer }
        />
        {answered && (
          <GenericBtn
            id="btn-next"
            onClick={ lastQuestion
              ? this.showRank
              : this.handleNext }
            value="Próxima"
          />
        )}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextQuestion()),
  addScore: (score) => dispatch(currentScore(score)),
  addOneAssertion: () => dispatch(addAssertion()),
});

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  qIndex: state.gameReducer.qIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
