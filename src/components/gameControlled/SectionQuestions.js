import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../Button';
import { questionsFetchAPI } from '../../redux/actions';

class SectionQuestions extends React.Component {
  async componentDidMount() {
    const {
      props: { token, setQuestions },
    } = this;

    await setQuestions(token);
  }

  render() {
    const {
      props: {
        questionPosition,
        correctClick,
        wrongClick,
        questionsDisable,
        color,
        count,
        questions,
      },
    } = this;
    const numberMax = 5;

    if (!questions) return <h2>Loading...</h2>;
    if (questionPosition === numberMax) {
      return <Redirect to="feedback" />;
    }

    return (
      <section>
        <h2>{ count }</h2>
        <h2 data-testid="question-category">{ questions[questionPosition].category }</h2>
        <h3 data-testid="question-text">{ questions[questionPosition].question }</h3>
        <section>
          {
            questions[questionPosition].incorrect_answers.map((answers, index) => (
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
            name={ questions[questionPosition].correct_answer }
            handleClick={ correctClick }
            disabled={ questionsDisable }
            className={ color ? 'correctColor' : null }
          />
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
