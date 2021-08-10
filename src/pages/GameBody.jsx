import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllQuestions } from '../redux/action/index';

class GameBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      disable: true,
      alternatives: [],
      randomIndex: '',
    };
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.rad = this.rad.bind(this);
    this.createOptions = this.createOptions.bind(this);
  }

  componentDidMount() {
    const { getQuest } = this.props;
    const token = localStorage.getItem('token');
    getQuest(token);
    console.log(token);
  }

  nextQuestion() {
    const { index } = this.state;
    // index precisa ser tratado , pois ira sobresair o tamanho do array
    this.setState({
      index: index + 1,
    });
    this.rad();
  }

  prevQuestion() { // teste apagar depois
    const { index } = this.state;
    // index precisa ser tratado , pois ira sobresair o tamanho do array
    this.setState({
      index: index - 1,
    });
    this.rad();
  }

  createQuestion() {
    const { results } = this.props;
    const { index } = this.state;
    const { category, question } = results[index];
    return (
      <div>
        <h3 data-testid="question-category">{ category }</h3>
        <h2 data-testid="question-text">{ question }</h2>
        {this.createOptions()}
      </div>
    );
  }

  rad() {
    console.log('rad');
    const { results } = this.props;
    const { index } = this.state;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[index];
    const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
    incorrectAnswers.splice(randomIndex, 0, correctAnswer);
    this.setState({
      alternatives: incorrectAnswers,
      randomIndex,
    });
    console.log('rand', randomIndex);
  }

  createOptions() {
    console.log('chamou createOptions');

    const { alternatives, randomIndex } = this.state;
    return (alternatives.map((elm, ind) => (
      ind === randomIndex
        ? (
          <button
            type="button"
            onClick={ this.result }
            key={ ind }
            data-testid="correct-answer"
          >
            {elm}
          </button>
        )
        : (
          <button
            type="button"
            onClick={ this.result }
            key={ ind }
            data-testid={ `wrong-answer-${ind}` }
          >
            {elm}
          </button>
        )
    )));
  }

  render() {
    const { disable, index } = this.state;
    const { results } = this.props;
    const { category, question } = results[index];
    console.log(this.props);
    return (
      <div>
        <div>
          <h3 data-testid="question-category">{ category }</h3>
          <h2 data-testid="question-text">{ question }</h2>
          {/* {this.createOptions()} */}
        </div>
        <button
          type="button"
          disable={ disable }
          onClick={ this.nextQuestion }
        >
          Next
        </button>
        <button
          type="button"
          disable={ disable }
          onClick={ this.prevQuestion }
        >
          Prev
        </button>
      </div>
    );
  }
}

GameBody.propTypes = {
  results: PropTypes.string.isRequired,
  getQuest: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuest: (token) => dispatch(getAllQuestions(token)),
});

const mapStateToProps = (state) => ({
  results: state.questions.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);
