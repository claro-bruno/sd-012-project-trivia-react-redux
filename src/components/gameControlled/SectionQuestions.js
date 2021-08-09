import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import questions from '../../questions';

class SectionQuestions extends React.Component {
  render() {
    const {
      props: {
        questionPosition,
        correctClick,
        wrongClick,
        questionsDisable,
        color,
        count,
      },
    } = this;

    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionPosition];

    return (
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
            handleClick={ correctClick }
            disabled={ questionsDisable }
            className={ color ? 'correctColor' : null }
          />
        </section>
      </section>
    );
  }
}

const { number, func, bool } = PropTypes;
SectionQuestions.propTypes = {
  questionPosition: number.isRequired,
  correctClick: func.isRequired,
  wrongClick: func.isRequired,
  questionsDisable: bool.isRequired,
  color: bool.isRequired,
  count: number.isRequired,
};

export default SectionQuestions;
