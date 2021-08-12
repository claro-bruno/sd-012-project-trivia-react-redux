import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// logica baseada no seguinte repositorio https://github.com/tryber/sd-012-project-trivia-react-redux/pull/8/commits/a93062a005d249fcc708168294a7926669bbf914

class Questions extends React.Component {
  render() {
    const { questionNumber, count, disabled, handleClick, triviaQuest } = this.props;

    return (
      <div>
        <p data-testid="question-category">
          { triviaQuest[questionNumber].category }
        </p>
        <p data-testid="question-text">
          { triviaQuest[questionNumber].question }
        </p>
        <button
          id="correct"
          type="button"
          data-testid="correct-answer"
          name="correct"
          value={ triviaQuest[questionNumber].difficulty }
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          { triviaQuest[questionNumber].correct_answer }
        </button>
        {
          triviaQuest[questionNumber].incorrect_answers.map((key, index) => (
            <button
              id="incorrect"
              type="button"
              data-testid={ `wrong-answer-${index}` }
              name="incorrect"
              value={ triviaQuest[questionNumber].difficulty }
              disabled={ disabled }
              onClick={ handleClick }
              key={ key }
            >
              { key }
            </button>
          ))
        }
        <h3>
          Tempo:
          { count }
        </h3>
      </div>
    );
  }
}

Questions.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  triviaQuest: state.questions.questions,
});

export default connect(mapStateToProps)(Questions);
