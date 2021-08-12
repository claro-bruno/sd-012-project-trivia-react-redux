import React, { Component } from 'react';
import { string, arrayOf, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import randomize from '../../functions/randomize';
import NextQuestionBtn from './NextQuestionBtn';
// import correctFalseAnswer from '../../functions/correctFalseAnswer';
import { setAnsweredTrueCorrect, setAnsweredTrueIncorrect } from '../../actions';

class QuestionAnswers extends Component {
  render() {
    const {
      startTimer,
      correctAnswer,
      wrongAnswers,
      answered,
      answeredTrueCorrect,
      answeredTrueIncorrect } = this.props;
    const allAnswers = [...wrongAnswers
      .map((answer, index) => ({
        correct: false, answer, index, isCorrect: 'wrong-answer',
      })),
    { correct: true, answer: correctAnswer, isCorrect: 'correct-answer' },
    ];
    const randomIndex = randomize(allAnswers.length, allAnswers.length - 1);
    return (
      <div className="buttons-container">
        <div className="buttons-answerers-container">
          {randomIndex.map((number) => {
            const { correct, answer, index: i, isCorrect } = allAnswers[number];
            return (
              <div key={ answer } className="buttons-answerers">
                <button
                  type="button"
                  key={ answer }
                  data-testid={ correct ? 'correct-answer' : `wrong-answer-${i}` }
                  disabled={ answered }
                  onClick={ correct ? answeredTrueCorrect : answeredTrueIncorrect }
                  className={ answered ? isCorrect : '' }
                >
                  {answer}
                </button>
              </div>
            );
          })}
        </div>
        <div className="next-question">
          {
            answered
            && <NextQuestionBtn
              startTimer={ startTimer }
              handleAnswered={ this.handleAnswered }
            />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  answeredTrueCorrect: () => dispatch(setAnsweredTrueCorrect()),
  answeredTrueIncorrect: () => dispatch(setAnsweredTrueIncorrect()),
});

const mapStateToProps = ({ questions }) => ({
  answered: questions.answered,
});

QuestionAnswers.propTypes = {
  correctAnswer: string.isRequired,
  wrongAnswers: arrayOf(string).isRequired,
  answered: bool.isRequired,
  startTimer: func.isRequired,
  answeredTrueCorrect: func.isRequired,
  answeredTrueIncorrect: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswers);
