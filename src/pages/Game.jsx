import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { getTriviaAPI } from '../redux/action';
=======
import { getTriviaAPI } from '../redux/action/index';
import HeaderGame from '../components/HeaderGame';
>>>>>>> 08c193cf85a32f1403cccd32a3031c5589204572

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
    };
=======
      alternatives: [],
      randomIndex: '',
    };
    this.rad = this.rad.bind(this);
    // this.result = this.result.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.createOptions = this.createOptions.bind(this);
  }

  componentDidMount() {
    const { getAPI } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAPI(token);
    const timer = 1000;
    setTimeout(() => {
      const { questions } = this.props;
      this.rad(questions);
    }, timer);
  }

  rad(quest) {
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = quest[0];
    const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
    incorrectAnswers.splice(randomIndex, 0, correctAnswer);
    this.setState({
      alternatives: incorrectAnswers,
      randomIndex,
    });
  }

  createQuestion() {
    const { questions } = this.props;
    const enun = questions.map((elm, ind) => {
      const { category, question } = elm;
      return (
        <div key={ ind }>
          <h3 data-testid="question-category">{ category }</h3>
          <h2 data-testid="question-text">{ question }</h2>
          {this.createOptions()}
        </div>
      );
    });
    return enun;
  }

  createOptions() {
    const { alternatives, randomIndex } = this.state;
    const buttons = alternatives.map((elm, ind) => (
      ind === randomIndex
        ? (
          <button
            type="button"
            onClick={ this.result }
            key={ ind }
            data-testid="correct-answer"
          >
            {elm}
          </button>
        )
        : (
          <button
            type="button"
            onClick={ this.result }
            key={ ind }
            data-testid={ `wrong-answer-${ind}` }
          >
            {elm}
          </button>
        )
    ));
    return buttons;
>>>>>>> 08c193cf85a32f1403cccd32a3031c5589204572
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
<<<<<<< HEAD
    const { getAPI, questions } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(questions)
    return (
      <>
        <button type="button" onClick={ () => getAPI(token) }>Update question</button>
        <p>{questions.difficulty}</p>
=======
    const { token } = this.props;
    return (
      <>
        <header>
          <HeaderGame />
        </header>
        {
          (token === 0) ? this.createQuestion() : <p>LOADING</p>
        }
>>>>>>> 08c193cf85a32f1403cccd32a3031c5589204572
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
<<<<<<< HEAD
=======
  token: state.token.response_code,
>>>>>>> 08c193cf85a32f1403cccd32a3031c5589204572
});

const mapDispatchToProps = (dispatch) => ({
  getAPI: (token) => dispatch(getTriviaAPI(token)),
});

Game.propTypes = {
  getAPI: PropTypes.func.isRequired,
<<<<<<< HEAD
  questions: PropTypes.shape({
    results: PropTypes.shape({
      category: PropTypes.string,
      question: PropTypes.string,
      correctAnswer: PropTypes.string,
      incorrectAnswers: PropTypes.string,
    }),
  }).isRequired,
=======
  token: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
>>>>>>> 08c193cf85a32f1403cccd32a3031c5589204572
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
