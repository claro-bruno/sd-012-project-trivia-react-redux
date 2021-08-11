import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../Button';
import { questionsFetchAPI } from '../../redux/actions';

class SectionQuestions extends React.Component {
  constructor() {
    super();

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  async componentDidMount() {
    const {
      props: { token, setQuestions },
    } = this;

    await setQuestions(token);
  }

  shuffleAnswers(correct, incorrect, difficulty) {
    // referencia:
    // https://github.com/tryber/sd-012-project-trivia-react-redux/pull/78/files
    // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    const { props: { correctClick, wrongClick, color } } = this;
    const NUMBER_ONE_NEGATIVE = -1;
    const NUMBER_ONE = 1;
    return [
      {
        answer: correct,
        testid: 'correct-answer',
        handleClick: () => correctClick(difficulty),
        className: color ? 'correctColor' : null,
      },
      ...incorrect.map((answer, index) => ({
        answer,
        testid: `wrong-answer-${index}`,
        handleClick: wrongClick,
        className: color ? 'wrongColor' : null,
      })),
    ].sort((a, b) => {
      if (a.answer < b.answer) {
        return NUMBER_ONE_NEGATIVE;
      }
      if (a.answer > b.answerm) {
        return NUMBER_ONE;
      }
      return 0;
    });
  }

  render() {
    const {
      props: { questionPosition, questionsDisable, count, questions },
    } = this;

    if (questions.length === 0) {
      return <h2>Loading...</h2>;
    }

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      difficulty,
    } = questions[questionPosition];

    return (
      <section>
        <h2>{ count }</h2>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        <section>
          {
            this.shuffleAnswers(
              correctAnswer,
              incorrectAnswers,
              difficulty,
            ).map(({ answer, testid, handleClick, className }) => (
              <Button
                testId={ testid }
                key={ answer }
                name={ answer }
                disabled={ questionsDisable }
                handleClick={ handleClick }
                className={ className }
              />))
          }
        </section>
      </section>
    );
  }
}

const { number, func, bool, string, arrayOf, objectOf } = PropTypes;
SectionQuestions.propTypes = {
  questionPosition: number.isRequired,
  correctClick: func.isRequired,
  wrongClick: func.isRequired,
  questionsDisable: bool.isRequired,
  color: bool.isRequired,
  count: number.isRequired,
  token: string.isRequired,
  questions: arrayOf(objectOf(string)).isRequired,
  setQuestions: func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.tokenTriviaReducer.token,
  questions: state.questionsTriviaReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (token) => dispatch(questionsFetchAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionQuestions);
