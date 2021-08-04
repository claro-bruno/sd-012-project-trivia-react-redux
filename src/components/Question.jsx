import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './button';
import fetchQuiz from '../redux/fetchs/fetchQuiz';
import fetchToken from '../redux/fetchs/fetchToken';
import randomize from '../functions/randomize';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      button: false,
      pergunta: 0,
    };
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentDidMount() {
    const { getQuiz, token } = this.props;
    console.log(token);
    const quantity = 300;
    getQuiz(token, quantity);
  }

  handleClickButton() {
    this.setState({ button: true });
  }

  handleClickNext() {
    this.setState((state) => {
      const { questions } = this.props;
      if (state.pergunta >= questions.length - 1) {
        return ({
          button: false,
        });
      }
      return ({
        pergunta: state.pergunta + 1,
        button: false,
      });
    });
  }

  render() {
    const { button, pergunta } = this.state;
    const { questions, loading } = this.props;
    if (loading) { return <p>Loading...</p>; }
    const alternatives = [
      ...questions[pergunta].incorrect_answers
        .map((alt, index) => ({ correct: false, alt, index })),
      { correct: true, alt: questions[pergunta].correct_answer }];
    const randomIndex = randomize(alternatives.length, alternatives.length - 1);
    console.log(questions);
    console.log(alternatives);
    return (
      <div className="question">

        <h1 data-testid="question-category">{questions[pergunta].category}</h1>
        <p data-testid="question-text">{questions[pergunta].question}</p>

        <h1 data-testid="question-category">{question.category}</h1>
        <p data-testid="question-text">{question.question}</p>

        <div className="alternatives">
          {randomIndex.map((index) => {
            const { correct, alt, index: i } = alternatives[index];
            return (
              <button
                type="button"
                key={ alt }
                data-testid={ correct ? 'correct-answer' : `wrong-answer${i}` }
                onClick={ this.handleClickButton }
              >
                {alt}
              </button>
            );
          })}
          { button && <Button onClick={ this.handleClickNext } /> }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.quiz.questions,
  loading: state.quiz.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuiz: (token, quantity) => dispatch(fetchQuiz(token, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

Question.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};
