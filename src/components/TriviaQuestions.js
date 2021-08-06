import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TriviaQuestions extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      correctanswer: '',
      incorrectanswer: '',
      disabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.incorrectAnswer = this.incorrectAnswer.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  correctAnswer() {
    this.setState({
      correctanswer: '3px solid rgb(6, 240, 15)',
      incorrectanswer: '3px solid rgb(255, 0, 0)',
      disabled: true,
    });
  }

  incorrectAnswer() {
    this.setState({
      incorrectanswer: '3px solid rgb(255, 0, 0)',
      correctanswer: '3px solid rgb(6, 240, 15)',
      disabled: true,
    });
  }

  shuffleQuestions({ correct_answer: correct, incorrect_answers: incorrect }) {
    const arrayQuestions = [correct, ...incorrect];
    const numOfQuestions = 0.5;
    const randomQuestions = arrayQuestions.sort(() => Math.random() - numOfQuestions);
    return randomQuestions;
  }

  handleClick() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      correctanswer: '',
      incorrectanswer: '',
      disabled: false,
    }));
  }

  render() {
    const { playerState } = this.props;
    const { correctanswer, incorrectanswer, id, disabled } = this.state;
    if (playerState.length === 0) return <span>Carregando...</span>;
    const { category, question, correct_answer: correct } = playerState[id];
    const arrayQuestions = this.shuffleQuestions(playerState[id]);
    return (
      <section>
        <h3 data-testid="question-category">{ category }</h3>
        <h4 data-testid="question-text">{ question }</h4>
        { arrayQuestions.map((answer, index) => {
          const incorrectAnswers = arrayQuestions.filter((ans) => ans !== correct);
          if (answer === correct) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                style={ { border: correctanswer } }
                type="button"
                onClick={ this.correctAnswer }
                disabled={ disabled }
              >
                { answer }
              </button>
            );
          }
          const indexWrong = incorrectAnswers.indexOf(answer);
          return (
            <button
              data-testid={ `wrong-answer-${indexWrong}` }
              style={ { border: incorrectanswer } }
              type="button"
              key={ index }
              onClick={ this.incorrectAnswer }
              disabled={ disabled }
            >
              { answer }
            </button>
          );
        }) }
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Próxima
        </button>
      </section>
    );
  }
}

TriviaQuestions.propTypes = {
  playerState: PropTypes.objectOf({
    question: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  playerState: state.fetchReducers.questions,
});

export default connect(mapStateToProps)(TriviaQuestions);
