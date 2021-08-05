import React from 'react';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      isCorrect: false,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
  }

  handleNext() {
    this.setState((state) => ({
      index: state.index + 1,
    }))
  }

  handleCorrectAnswer(event) {
    if (event.target.classList.contains('correct')) {
      this.setState({
        isCorrect: true,
      })
    }
  }

  render() {
    const { index } = this.state;
    const { questions } = this.props;
    return (
      <section>    
        {!questions.length ? null : 
        <>  
          <p data-testid="question-category">{ questions[index].category }</p>
          <h3 data-testid="question-text">{ questions[index].question }</h3>
          <button
            type="button"
            onClick={ (event) => this.handleCorrectAnswer(event) }
            data-testid="correct-answer"
            className="correct"
          >
          {questions[index].correct_answer}
        </button>
        {questions[index].incorrect_answers.map((wrongAnswer, index) => (
          <button
            type="button"
            onClick={ (event) => this.handleCorrectAnswer(event) }
            data-testid={ `wrong-answer-${index}` }
          >
            {wrongAnswer}
          </button>
        ))}
          <button type="button" onClick={ this.handleNext }>NEXT QUESTION</button>
        </>
        }
      </section>
    );
  }
}

export default Question;
