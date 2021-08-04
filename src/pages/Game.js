import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requisitionAPI } from '../redux/actions';
import { API_TRIVIA } from '../services/api';

class Game extends Component {
  constructor(props) {
    super(props);

    this.fetchTrivia = this.fetchTrivia.bind(this);
  }

  async componentDidMount() {
    await this.fetchTrivia();
  }

  async fetchTrivia() {
    const { QuestionsTrivia, token } = this.props;

    const questions = await API_TRIVIA(token);
    QuestionsTrivia(questions);
  }

  Answers(question) {
    console.log('Estou na function');
    const answersCreate = question.incorrect_answers
      .concat(question.correct_answer);

    return answersCreate.map((answer, index) => (
      <button
        type="button"
        key={ index }
        value={ answer }
        data-testid={ question.correct_answer === answer
          ? 'correct-answer' : `wrong-answer-${index}` }
      >
        { answer }
      </button>
    ));
  }

  render() {
    const { questionsGame } = this.props;
    console.log(questionsGame);

    if (questionsGame === null) {
      return <div>Loading...</div>;
    }
    return (
      <>
        { questionsGame.map((question, index) => (
          <div key={ index }>
            <span data-testid="question-category">{ question.category }</span>
            <h2 data-testid="question-text">{ question.question }</h2>
            <div>
              { this.createAnswers(question) }
            </div>
          </div>
        )) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsGame: state.requisitionAPI.questions.results,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsTrivia: (payload) => dispatch(requisitionAPI(payload)),
});

Game.propTypes = {
  requisitionAPI: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);