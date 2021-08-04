import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
    };
    this.shuffle = this.shuffle.bind(this);
    this.shuffledAnswers = this.shuffledAnswers.bind(this);
  }

  shuffle(array) {
    let j;
    let x;
    let i;
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  shuffledAnswers(question) {
    const answersArray = [
      question.incorrect_answers[0],
      question.incorrect_answers[1],
      question.incorrect_answers[2],
      question.correct_answer,
    ];
    let controllIncorrects = 0;
    const answersArrayShuffled = this.shuffle(answersArray);
    return (
      answersArrayShuffled.map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ index }
              data-testid="correct-answer"
              type="button"
            >
              { question.correct_answer }
            </button>
          );
        }
        controllIncorrects += 1;
        return (
          <button
            key={ index }
            data-testid={ `wrong-answer-${controllIncorrects - 1}` }
            type="button"
          >
            { question.incorrect_answers[controllIncorrects - 1] }
          </button>
        );
      })
    );
  }

  render() {
    const { currentQuestion } = this.state;
    const { questions } = this.props;
    console.log(questions);
    const questionTest = {
      category: 'Animals',
      correct_answer: 'Cheetah',
      difficulty: 'easy',
      incorrect_answers: {
        0: 'Lion',
        1: 'Thomson&rsquo;s Gazelle',
        2: 'Pronghorn Antelope',
      },
      question: 'What is the fastest  land animal?',
      type: 'multiple',
    };
    if (questions.length === 0) {
      return (
        <div>
          <span data-testid="question-category">
            { questionTest.category }
          </span>
          <p data-testid="question-text">
            { questionTest.question }
          </p>
          { this.shuffledAnswers(questionTest) }
        </div>
      );
    }
    return (
      <div>
        <span data-testid="question-category">
          { questions[currentQuestion].category }
        </span>
        <p data-testid="question-text">
          { questions[currentQuestion].question }
        </p>
        { this.shuffledAnswers(questions[currentQuestion]) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
  };
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Trivia);
