import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { questionsFetchAPI, addAssertions } from '../redux/actions';
import questions from '../questions';
import Button from '../components/Button';
import '../App.css';

class Game extends React.Component {
  constructor() {
    super();

    this.correctClick = this.correctClick.bind(this);
    this.wrongClick = this.wrongClick.bind(this);
    this.timer = this.timer.bind(this);
    this.startTime = this.startTime.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.calculateHits = this.calculateHits.bind(this);
    this.statesAfterResponse = this.statesAfterResponse.bind(this);

    this.state = {
      correctAnswers: 0,
      questionPosition: 3,
      questionsDisable: false,
      color: false,
      count: 30,
    };
  }

  componentDidMount() {
    const {
      startTime,
      props: { setQuestions, getToken },
    } = this;

    setQuestions(getToken);
    startTime();
  }

  componentDidUpdate() {
    const { stopTime } = this;

    stopTime();
  }

  statesAfterResponse(points = 0) {
    clearInterval(this.interval);
    this.setState((state) => ({
      ...state,
      questionsDisable: true,
      correctAnswers: points,
      color: true,
      count: 30,
    }));
  }

  calculateHits(difficulty, count) {
    const level = { hard: 3, medium: 2, easy: 1 }[difficulty];
    const TEN = 10;
    const points = TEN + (level * count);
    return points;
  }

  correctClick(difficulty) {
    const {
      calculateHits,
      props: { setAssertions },
      state: { correctAnswers, count },
    } = this;

    this.statesAfterResponse(calculateHits(difficulty, count));

    setAssertions(correctAnswers);
  }

  startTime() {
    const { timer } = this;
    const ONE_SECOND = 1000;

    this.interval = setInterval(timer, ONE_SECOND);
  }

  stopTime() {
    const {
      wrongClick,
      state: { count },
    } = this;

    if (count === 0) {
      clearInterval(this.interval);
      wrongClick();
    }
  }

  timer() {
    const {
      state: { count },
    } = this;

    this.setState((state) => ({
      ...state,
      count: count - 1,
    }));
  }

  wrongClick() {
    this.statesAfterResponse();
  }

  render() {
    const {
      state: { questionPosition, questionsDisable, color, count },
      correctClick,
      wrongClick,
    } = this;

    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionPosition];

    return (
      <>
        <Header />
        <section>
          <h2>{ count }</h2>
          <h2 data-testid="question-category">{ category }</h2>
          <h3 data-testid="question-text">{ question }</h3>
          <section>
            {
              incorrectAnswers.map((answers, index) => (
                <Button
                  testId={ `wrong-answer-${index}` }
                  key={ answers }
                  name={ answers }
                  handleClick={ wrongClick }
                  disabled={ questionsDisable }
                  className={ color ? 'wrongColor' : null }
                />
              ))
            }
            <Button
              testId="correct-answer"
              name={ correctAnswer }
              handleClick={ () => correctClick(difficulty) }
              disabled={ questionsDisable }
              className={ color ? 'correctColor' : null }
            />
          </section>
        </section>
      </>
    );
  }
}

const { string, func } = PropTypes;
Game.propTypes = {
  getToken: string.isRequired,
  setQuestions: func.isRequired,
  setAssertions: func.isRequired,
};

const mapStateToProps = (state) => ({
  getToken: state.tokenTriviaReducer.token,
  getQuestions: state.questionsTriviaReducer.questions,
  getUserData: state.addLoginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (token) => dispatch(questionsFetchAPI(token)),
  setAssertions: (assertions) => dispatch(addAssertions(assertions)),
  // setScore: (userData, assertions) => dispatch(addStorage(userData, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
