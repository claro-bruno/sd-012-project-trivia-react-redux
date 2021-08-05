import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      seconds: 30,
      disabled: false,
    };

    this.changeColorsAnswer = this.changeColorsAnswer.bind(this);
    this.changeButtonVisibility = this.changeButtonVisibility.bind(this);
    this.count = this.count.bind(this);
  }

  componentDidMount() {
    this.count();
  }

  count() {
    const sec = 1000;
    const interval = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      });
      if (seconds === 1) {
        clearInterval(interval);
        this.setState({
          seconds: 'Time\'s Up',
          disabled: true,
        });
      }
    }, sec);
  }



  render() {
    const { disabled } = this.state;
    return (
      <div>
        { !questions.length
          ? null
          : (
            <div className="question-container">
              <p className="question-category" data-testid="question-category">
                <span className="category">Category:</span>
                {`${questions[index].category}`}
              </p>
              <p data-testid="question-text" className="question-text">
                <span className="question">Question:</span>
                {`${questions[index].question}`}
              </p>
              {/* Aqui eu resolvi chamar de UniqueButton
              pois ele não compartilha características
              com os botões de resposta errada */}
              <UniqueButton
                disabled={ disabled }
                className="correct-answer"
                onClick={ () => {
                  this.changeButtonVisibility();
                  this.changeColorsAnswer();
                } }
                innerText={ questions[index].correct_answer }
              />
              {questions[index].incorrect_answers.map((incorrect, i) => (
                <Button
                  className="incorrect-answer"
                  key={ index }
                  dataTestId={ `wrong-answer-${i}` }
                  onClick={ () => {
                    this.changeButtonVisibility();
                    this.changeColorsAnswer();
                  } }
                  innerText={ incorrect }
                />
              ))}
              <button
                data-testid="btn-next"
                type="button"
                className="btn-next"
              >
                PRÓXIMA
              </button>
            </div>
          )}
        <Timer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Question);
