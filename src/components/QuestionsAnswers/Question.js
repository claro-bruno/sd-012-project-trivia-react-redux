import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isCorrect: '',
      answered: false,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  componentDidMount() {
    this.startQuiz();
  }

  handleCorrectAnswer() {
    this.setState({
      answered: true,
    });
  }

  startQuiz() {
    const { questions } = this.props;
    const { index, isCorrect } = this.state;
    this.setState({
      isCorrect: questions[index].correct_answer,
    });
    console.log(isCorrect);
  }

  handleNext() {
    this.setState((state) => ({
      index: state.index + 1,
      answered: false,
    }));
  }

  render() {
    const { index, answered, isCorrect } = this.state;
    const { questions } = this.props;
    const lastQuestion = questions.length === index + 1;
    const { incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = questions[index];
    const NUMBER = 0.5;
    const newArray = [...incorrectAnswers, correctAnswer]
      .sort(() => (
        Math.random() - NUMBER
      ));
    console.log(newArray);
    return (
      <section>
        {!questions.length ? null : (
          <div>
            <p data-testid="question-category">{ questions[index].category }</p>
            <h3 data-testid="question-text">{ questions[index].question }</h3>
            {newArray.map((option, indice) => (
              <button
                type="button"
                key={ indice }
                onClick={ () => this.handleCorrectAnswer() }
                disabled={ answered }
                data-testid={ isCorrect.includes(option)
                  ? 'correct-answer' : `wrong-answer-${indice}` }
              >
                {option}
              </button>
            ))}
            {answered && (
              <button
                type="button"
                onClick={ lastQuestion ? 'acabou' : this.handleNext }
              >
                PRÓXIMA
              </button>)}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Question);
