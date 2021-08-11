import React from 'react';
import PropTypes from 'prop-types';
import './Answers.css';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   arrayAnswers: [],
    // };

    this.shuffleArray = this.shuffleArray.bind(this);
    // this.teste = this.teste.bind(this);
  }

  // componentDidMount() {
  //   const { question } = this.props;
  //   console.log('questao', question);

  //   const answers = [...question.incorrect_answers, question.correct_answer];
  //   console.log('respostas', answers);

  //   this.shuffleArray(answers);
  //   this.teste(answers);
  // }

  // teste(answers) {
  //   this.setState({ arrayAnswers: answers });
  // }

  // consultei o StackOverFlow para resolver essa parte
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    // this.setState({ arrayAnswers: array });
    return array;
  }

  // answers(question, show) {
  //   const answers = [...question.incorrect_answers, question.correct_answer];
  //   const arrayAnswers = this.shuffleArray(answers);
  //   const { onClick } = this.props;
  //   let controllIncorrects = 0;
  //   return (
  //     arrayAnswers.map((answer, index) => {
  //       if (answer === question.correct_answer) {
  //         return (
  //           <button
  //             key={ index }
  //             type="button"
  //             // onClick={ () => sendShowAnswers(true) }
  //             onClick={ () => onClick() }
  //             data-testid="correct-answer"
  //             className={ show ? 'correct answer-btn' : 'answer-btn' }
  //             name="wrong-answer"
  //           >
  //             {question.correct_answer}
  //           </button>
  //         );
  //       }

  //       controllIncorrects += 1;
  //       return (
  //         <button
  //           key={ index }
  //           type="button"
  //           className={ show ? 'wrong answer-btn' : 'answer-btn' }
  //           // onClick={ () => sendShowAnswers(true) }
  //           onClick={ () => onClick() }
  //           data-testid={ `wrong-answer-${controllIncorrects - 1}` }
  //         >
  //           {question.incorrect_answers[controllIncorrects - 1]}
  //         </button>
  //       );
  //     })
  //   );
  // }

  render() {
    const { question, show } = this.props;
    // const { arrayAnswers } = this.state;
    const incorrectAnswers = question.incorrect_answers;
    const { onClick } = this.props;
    return (
      <div>
        { incorrectAnswers.map((answer, index) => {
          console.log('teste');
          return (
            <button
              key={ index }
              type="button"
              onClick={ (event) => onClick(event) }
              data-testid={ `wrong-answer-${index}` }
              className={ show ? 'wrong answer-btn' : 'answer-btn' }
              name="wrong"
            >
              {question.incorrect_answers[index]}
            </button>
          );
        })}

        <button
          key="correct"
          type="button"
          onClick={ (event) => onClick(event) }
          data-testid="correct-answer"
          className={ show ? 'correct answer-btn' : 'answer-btn' }
          name="correct"
        >
          {question.correct_answer}
        </button>
      </div>
    );
  }
}

Answers.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Answers;
