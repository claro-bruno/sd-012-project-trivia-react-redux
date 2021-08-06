import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTriviaAPI } from '../redux/action';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { getAPI } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAPI(token);
  }

  // random() {
  //     const { questions } = this.props;
  //     const { results: { correctAnswer, incorrectAnswers } } = questions;
  //     const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
  //     incorrectAnswers.slice(randomIndex, 1, correctAnswer);
  //     this.setState({
  //       alternatives: incorrectAnswers,
  //       randomIndex: { randomIndex },
  //     });
  //   }

  //   result() {
  //     return <p>por enquanto isso</p>;
  //   }

  //   render() {
  //     console.log(this.props.questions)
  //     const { alternatives, randomIndex } = this.state;
  //     return (
  //       <div>
  //           {
  //             this.props.questions.map((alternativa, index) => {
  //               const { category, question } = alternativa;
  //               return (
  //               <div>
  //               <h3 data-testid="question-category">{ category }</h3>
  //               <h2 data-testid="question-text">{ question }</h2>
  //               { if (index === randomIndex) {
  //                 return (
  //                   <button
  //                     type="button"
  //                     onClick={ this.result }
  //                     key={ index }
  //                     data-testid="correct-answer"
  //                   >
  //                     {alternativa}
  //                   </button>);
  //               } else {
  //               return (
  //                 <button
  //                   type="button"
  //                   onClick={ this.result }
  //                   key={ index }
  //                   data-testid={ `wrong-answer-${index}` }
  //                 >
  //                   {alternativa}
  //                 </button>
  //               )}};
  //             </div>
  //             )
  //             })
  //           }
  //         </div>
  //     );
  //   }
  // }

  render() {
    const { getAPI, questions } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(questions)
    return (
      <>
        <button type="button" onClick={ () => getAPI(token) }>Update question</button>
        <p>{questions.difficulty}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  getAPI: (token) => dispatch(getTriviaAPI(token)),
});

Game.propTypes = {
  getAPI: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.shape({
      category: PropTypes.string,
      question: PropTypes.string,
      correctAnswer: PropTypes.string,
      incorrectAnswers: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
