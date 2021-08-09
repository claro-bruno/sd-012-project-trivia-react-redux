import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
import { fetchQuestions } from '../actions/game';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Game extends Component {
  constructor() {
    super();
    this.randomizer = this.randomizer.bind(this);
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
    if (!rankingStorage) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  randomizer(arr) {
    const randomValue = 0.5;
    const randomizedAlternatives = arr.map((item) => (
      {
        question: item.question,
        category: item.category,
        difficulty: item.difficulty,
        alternatives: [
          ...item.incorrect_answers.map((answer, i) => ({
            answer,
            testid: `wrong-answer-${i}`,
            className: 'btn btn-danger',
            isCorrect: false,
          })), {
            answer: item.correct_answer,
            testid: 'correct-answer',
            className: 'btn btn-success',
            isCorrect: true,
          },
        ].sort(() => Math.random() - randomValue),
      }
    ));
    return (randomizedAlternatives);
  }

  render() {
    const { questions } = this.props;
    if (!questions.length) return <Loading />;
    return (
      <main className="game-page d-flex">
        <Header />
        <Questions questions={ this.randomizer(questions) } />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
  questions: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
