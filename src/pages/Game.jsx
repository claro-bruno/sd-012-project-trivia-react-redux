import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTriviaAPI } from '../redux/action/index';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternatives: [],
      randomIndex: '',
    };
    this.random = this.random.bind(this);
    // this.result = this.result.bind(this);
    this.functotal = this.functotal.bind(this);
  }

  componentDidMount() {
    const { getAPI } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getAPI(token);
  }

  random() {
    const { questions } = this.props;
    const { results: { correctAnswer, incorrectAnswers } } = questions;
    const randomIndex = Math.round(Math.random() * (incorrectAnswers.length - 0));
    incorrectAnswers.slice(randomIndex, 1, correctAnswer);
    this.setState({
      alternatives: incorrectAnswers,
      randomIndex,
    });
  }

  // if (index === randomIndex) {
  //   return (
  //     <button
  //       type="button"
  //       onClick={ this.result }
  //       key={ index }
  //       data-testid="correct-answer"
  //     >
  //       {alternativa}
  //     </button>);
  // }
  // } else {
  // return (
  //   <button
  //     type="button"
  //     onClick={ this.result }
  //     key={ index }
  //     data-testid={ `wrong-answer-${index}` }
  //   >
  //     {alternativa}
  //   </button>
  // )};

  // questions.map((alternativa, index) => {
  //   const { category, question } = alternativa;
  //   const { alternatives, randomIndex } = this.state;
  //   return (
  //     <div key={ index }>
  //       <h3 data-testid="question-category">{ category }</h3>
  //       <h2 data-testid="question-text">{ question }</h2>
  //       {
  //         index
  //           ? <button type="button" onClick={ this.result } key={ index } data-testid="correct-answer">{alternativa}</button>
  //           : 'asd'
  //       }

  functotal() {
    const { questions } = this.props;
    const { alternatives, randomIndex } = this.state;
    return questions.map((elm, ind) => {
      const { category, question } = elm;
      return (
        <div key={ ind }>
          <h3 data-testid="question-category">{ category }</h3>
          <h2 data-testid="question-text">{ question }</h2>
        </div>
      );
    });
  }

  render() {
    const { questions } = this.props;
    return ((questions[0].type !== '') ? this.functotal() : 'LOADING'
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
