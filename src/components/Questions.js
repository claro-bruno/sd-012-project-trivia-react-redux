import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { getQuiz, getScore, getCorrects } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      index: 0,
      redirect: false,
      ceil: 30,
      floor: 0,
      assertions: 0,
    };
    this.displayQuiz = this.displayQuiz.bind(this);
    this.displayQuestion = this.displayQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.setUserOnLocalStorage = this.setUserOnLocalStorage.bind(this);
  }

  componentDidMount() {
    this.displayQuiz();
    this.setTimer();
    this.setUserOnLocalStorage();
  }

  componentDidUpdate() {
    this.disableButtons();
  }

  onClickAnswer({ target }) {
    const nextButton = document.querySelector('.btn');
    const correct = 'correct-answer';
    const buttons = document.querySelectorAll('.answer-buttons');
    clearInterval(this.timerID);
    buttons.forEach((button) => {
      if (button.id === correct) {
        button.classList.add('correct');
        button.classList.add('btn-success');
        button.classList.add('btn');
      } else {
        button.classList.add('wrong');
        button.classList.add('btn-danger');
        button.classList.add('btn');
      }
    });
    if (target.id === correct) {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }), this.sumScore);
    }
    nextButton.classList.remove('isVisible');
  }

  setUserOnLocalStorage(value = 0) {
    const { userFromRedux } = this.props;
    const { assertions } = this.state;
    console.log(userFromRedux);
    const { name, email } = userFromRedux;
    const state = {
      player: {
        name,
        assertions,
        score: value,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  setTimer() {
    const timerSecond = 1000;
    this.timerID = setInterval(() => {
      const { ceil, floor } = this.state;
      this.setState({
        ceil: ceil - 1,
      }, () => {
        if (ceil === floor) {
          clearInterval(this.timerID);
        }
      });
    }, timerSecond);
  }

  sumScore() {
    const { quizFromRedux, scoreToRedux, scoreFromRedux, assertionsToRedux } = this.props;
    const { index, assertions } = this.state;
    const { difficulty } = quizFromRedux[index];
    const dez = 10;
    const { ceil } = this.state;
    const pontuacao = { hard: 3, medium: 2, easy: 1 };
    const calculo = dez + (ceil * pontuacao[difficulty]);
    console.log(calculo);
    const soma = calculo + scoreFromRedux;
    console.log(soma);
    scoreToRedux(soma);
    assertionsToRedux(assertions);
    this.setUserOnLocalStorage(soma);
  }

  disableButtons() {
    const buttons = document.querySelectorAll('.answer-buttons');
    const { ceil, floor } = this.state;
    buttons.forEach((button) => {
      if (ceil === floor) {
        button.setAttribute('disabled', 'disabled');
      }
    });
  }

  async displayQuiz() {
    const { quizToRedux } = this.props;
    await quizToRedux();
    this.endFetch();
  }

  endFetch() {
    const { quizFromRedux } = this.props;
    return quizFromRedux.length > 0 ? this.setState({ loading: false }) : null;
  }

  checkCorrect(item, correct, index) {
    if (item === correct) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  displayQuestion() {
    const { quizFromRedux } = this.props;
    const { index, ceil } = this.state;
    const {
      category,
      question,
      correct_answer: correct,
      sortedArray } = quizFromRedux[index];
    return (
      <div className="row align-items-start">
        <div className="col" />
        <div className="col">
          <div className="d-flex justify-content-center rounded-pill mt-3 bg-primary">
            <h3 className="text-light ">{ceil}</h3>
          </div>
          <h1 data-testid="question-category" className="text-light">
            { category }
          </h1>
          <br />
          <h4 data-testid="question-text" className="text-light">
            { question }
          </h4>
          <div className="d-flex flex-column">
            { sortedArray.map((item, i) => (
              <button
                id={ this.checkCorrect(item, correct, i) }
                data-testid={ this.checkCorrect(item, correct, i) }
                className="answer-buttons ml-auto mr-auto mt-2 btn btn-secondary"
                type="button"
                onClick={ this.onClickAnswer }
                key={ item }
              >
                {item}
              </button>)) }
          </div>
        </div>
        <div className="col" />
      </div>
    );
  }

  handleClick() {
    const { index } = this.state;
    const arrLength = 4;
    const nextButton = document.getElementById('next-button');
    if (index < arrLength) {
      clearInterval(this.timerID);
      this.setState((prevState) => ({
        index: prevState.index + 1,
        ceil: 30,
      }), () => this.setTimer());
      return nextButton.classList.add('isVisible');
    }
    return this.setState({
      redirect: true,
    });
  }

  render() {
    const { loading, redirect, index } = this.state;
    const redirectNumber = 4;

    return (
      <div className="container border border-warning rounded mt-2 bg-dark">
        { loading ? <Loading /> : this.displayQuestion()}
        <div className="row align-items-start">
          <div className="col" />
          <button
            onClick={ this.handleClick }
            type="button"
            className="isVisible btn btn-primary mt-2 col-2 mb-2"
            id="next-button"
            data-testid="btn-next"
          >
            { index < redirectNumber ? 'Proxima' : 'Ver Pontuação' }
          </button>
          <div className="col" />
        </div>
        { redirect ? <Redirect to="/feedback" /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizFromRedux: state.quizReducer.quiz,
  scoreFromRedux: state.quizReducer.score,
  userFromRedux: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  quizToRedux: () => dispatch(getQuiz()),
  scoreToRedux: (score) => dispatch(getScore(score)),
  assertionsToRedux: (assertions) => dispatch(getCorrects(assertions)),
});

Questions.propTypes = {
  quizFromRedux: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizToRedux: PropTypes.func.isRequired,
  scoreToRedux: PropTypes.func.isRequired,
  assertionsToRedux: PropTypes.func.isRequired,
  scoreFromRedux: PropTypes.number.isRequired,
  userFromRedux: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
