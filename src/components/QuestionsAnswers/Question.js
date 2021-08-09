import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };

    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    this.setState((state) => ({
      index: state.index + 1,
    }));
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    return (
      <section>
        {!questions.length ? null : (
          <div>
            <p data-testid="question-category">{ questions[index].category }</p>
            <h3 data-testid="question-text">{ questions[index].question }</h3>
            <button
              type="button"
              data-testid="correct-answer"
              className="correct"
            >
              {questions[index].correct_answer}
            </button>
            {questions[index].incorrect_answers.map((wrongAnswer, indexIncorrect) => (
              <button
                type="button"
                onClick={ (event) => this.handleCorrectAnswer(event) }
                data-testid={ `wrong-answer-${indexIncorrect}` }
                key={ indexIncorrect }
              >
                {wrongAnswer}
              </button>
            ))}
            <button type="button" onClick={ this.handleNext }>NEXT QUESTION</button>
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
