import React from 'react';
import PropTypes from 'prop-types';
import './Answers.css';

class AnswersTemp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayAnswers: [],
    };

    this.shuffleArray = this.shuffleArray.bind(this);
    this.answers = this.answers.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;
    console.log(question);

    const answers = [...question.incorrect_answers, question.correct_answer];
    console.log(answers);

    this.shuffleArray(answers);
  }

  // consultei o StackOverFlow para resolver essa parte
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
    this.setState({ arrayAnswers: array });
    return array;
  }

  answers(question, show, arrayAnswers) {
    // const answers = [...question.incorrect_answers, question.correct_answer];
    // const arrayAnswers = this.shuffleArray(answers);

    // const { onClick } = this.props;
    // let controllIncorrects = 0;
    // return (
    //   arrayAnswers.map((answer, index) => {
    //     if (answer === question.correct_answer) {
    //       return (
    //         <button
    //           key={ index }
    //           type="button"
    //           // onClick={ () => sendShowAnswers(true) }
    //           onClick={ () => onClick() }
    //           data-testid="correct-answer"
    //           className={ show ? 'correct answer-btn' : 'answer-btn' }
    //           name="wrong-answer"
    //         >
    //           {question.correct_answer}
    //         </button>
    //       );
    //     }

    //     controllIncorrects += 1;
    //     return (
    //       <button
    //         key={ index }
    //         type="button"
    //         className={ show ? 'wrong answer-btn' : 'answer-btn' }
    //         // onClick={ () => sendShowAnswers(true) }
    //         onClick={ () => onClick() }
    //         data-testid={ `wrong-answer-${controllIncorrects - 1}` }
    //       >
    //         {question.incorrect_answers[controllIncorrects - 1]}
    //       </button>
    //     );
    //   })
    // );

  }

  render() {
    const { question, show } = this.props;
    const { arrayAnswers } = this.state;
    console.log(arrayAnswers);

    const { onClick } = this.props;
    let controllIncorrects = 0;

    return (
      arrayAnswers.map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ index }
              type="button"
              onClick={ () => onClick() }
              data-testid="correct-answer"
              className={ show ? 'correct answer-btn' : 'answer-btn' }
              name="wrong-answer"
            >
              {question.correct_answer}
            </button>
          );
        }

        controllIncorrects += 1;
        return (
          <button
            key={ index }
            type="button"
            className={ show ? 'wrong answer-btn' : 'answer-btn' }
            onClick={ () => onClick() }
            data-testid={ `wrong-answer-${controllIncorrects - 1}` }
          >
            {question.incorrect_answers[controllIncorrects - 1]}
          </button>
        );
      })
    );
  }
}

AnswersTemp.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default AnswersTemp;
