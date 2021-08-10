import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setScore } from '../redux/action';
import './Answers.css';

class GameBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disable: true,
      alternatives: [],
      randomIndex: '',
      className: '',
      className2: '',
      wrong: 'wrong',
      correct: 'correct',
      disableAnswers: false,
      timer: 2,
      score: 0,
      hidden: true,
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.rad = this.rad.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.buttonsAsnswer = this.buttonsAsnswer.bind(this);
    this.handleClickScore = this.handleClickScore.bind(this);
    this.buttonAnswer = this.buttonAnswer.bind(this);
  }

  componentDidMount() {
    this.rad();
  }

  handleClickScore(diff) {
    // console.log('gabriel', target, diff);
    const { setStateScore } = this.props;
    const { timer, score } = this.state;
    const dez = 10;
    const diffLevel = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const scoreCount = score + dez + (timer * diffLevel[diff]);
    console.log(scoreCount);
    // localStorage.setItem('score', token.token); NÃO ESQUECER DE SETAR O LOCAL STORAGE CONFORME ESTRUTURA RECOMENDADA
    setStateScore(scoreCount);
    this.buttonsAsnswer();
  }

  nextQuestion() {
    const { index } = this.state;
    // index precisa ser tratado , pois ira sobresair o tamanho do array
    this.setState({
      index: index + 1,
      disableAnswers: false,
      hidden: true,
      className: '',
      className2: '',
    });
    this.rad();
  }

  createQuestion() {
    const { results } = this.props;
    const { index } = this.state;
    console.log('results GameBody', results[index]);
    const { category, question } = results[index];
    return (
      <div>
        <h3 data-testid="question-category">{ category }</h3>
        <h2 data-testid="question-text">{ question }</h2>
        {this.createOptions ? this.createOptions() : ''}
      </div>
    );
  }

  rad() {
    const { results } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[0];
    const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
    incorrectAnswers.splice(randomIndex, 0, correctAnswer);
    this.setState({
      alternatives: incorrectAnswers,
      randomIndex,
    });
  }

  createOptions() {
    // console.log('chamou createOptions');
    const { index } = this.state;
    const { results } = this.props;
    const { difficulty } = results[index];
    // console.log('Gabriel', difficulty);

    const {
      alternatives,
      randomIndex,
      className,
      wrong,
      correct,
      className2,
      disableAnswers,
    } = this.state;
    return (alternatives.map((elm, ind) => (
      ind === randomIndex
        ? (
          <button
            type="button"
            disabled={ disableAnswers }
            onClick={ () => (this.handleClickScore(difficulty)) }
            key={ ind }
            data-testid="correct-answer"
            id={ correct }
            className={ className }
          >
            {elm}
          </button>
        )
        : (
          <button
            type="button"
            onClick={ this.buttonAnswer }
            disabled={ disableAnswers }
            key={ ind }
            data-testid={ `wrong-answer-${ind}` }
            id={ wrong }
            className={ className2 }
          >
            {elm}
          </button>
        )
    )));
  }

  buttonAnswer() {
    this.setState({
      disableAnswers: true,
      className: 'correctAnswer',
      className2: 'incorrectAnswer',
      hidden: false,
    });
  }

  render() {
    const { disable, hidden } = this.state;
    const { results } = this.props;
    return (
      <div>
        {
          (results.length > 0) ? this.createQuestion() : <p>LOADING</p>
        }
        <button
          type="button"
          disable={ disable }
          onClick={ this.nextQuestion }
          data-testid="btn-next"
          hidden={ hidden }
        >
          Next
        </button>
      </div>
    );
  }
}

GameBody.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStateScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  setStateScore: (score) => dispatch(setScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);
