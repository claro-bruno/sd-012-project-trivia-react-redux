import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTriviaAPI } from '../redux/action/index';
import HeaderGame from '../components/HeaderGame';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternatives: [],
      randomIndex: '',
    };
    this.rad = this.rad.bind(this);
    // this.result = this.result.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.createOptions = this.createOptions.bind(this);
  }

  componentDidMount() {
    const { getAPI } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAPI(token);
    const timer = 1000;
    setTimeout(() => {
      const { questions } = this.props;
      this.rad(questions);
    }, timer);
  }

  rad(quest) {
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = quest[0];
    const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
    incorrectAnswers.splice(randomIndex, 0, correctAnswer);
    this.setState({
      alternatives: incorrectAnswers,
      randomIndex,
    });
  }

  createQuestion() {
    const { questions } = this.props;
    const enun = questions.map((elm, ind) => {
      const { category, question } = elm;
      return (
        <div key={ ind }>
          <h3 data-testid="question-category">{ category }</h3>
          <h2 data-testid="question-text">{ question }</h2>
          {this.createOptions()}
        </div>
      );
    });
    return enun;
  }

  createOptions() {
    const { alternatives, randomIndex } = this.state;
    const buttons = alternatives.map((elm, ind) => (
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
    ));
    return buttons;
  }

  render() {
    const { token } = this.props;
    return (
      <>
        <header>
          <HeaderGame />
        </header>
        {
          (token === 0) ? this.createQuestion() : <p>LOADING</p>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
  token: state.token.response_code,
});

const mapDispatchToProps = (dispatch) => ({
  getAPI: (token) => dispatch(getTriviaAPI(token)),
});

Game.propTypes = {
  getAPI: PropTypes.func.isRequired,
  token: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
