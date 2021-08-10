import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.rad = this.rad.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.buttonAnswer = this.buttonAnswer.bind(this);
  }

  componentDidMount() {
    this.rad();
  }

  nextQuestion() {
    const { index } = this.state;
    // index precisa ser tratado , pois ira sobresair o tamanho do array
    this.setState({ index: index + 1 });
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
    const { alternatives, randomIndex, className, wrong,
      correct, className2 } = this.state;
    return ((alternatives).map((elm, ind) => (
      ind === randomIndex
        ? (
          <button
            type="button"
            onClick={ this.buttonAnswer }
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
      className: 'correctAnswer',
      className2: 'incorrectAnswer',
    });
  }

  render() {
    const { disable } = this.state;
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
        >
          Next
        </button>
      </div>
    );
  }
}

GameBody.propTypes = {
  results: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.results,
});

export default connect(mapStateToProps, null)(GameBody);
