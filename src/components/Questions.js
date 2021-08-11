import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { getQuiz } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      index: 0,
      redirect: false,
      ceil: 30,
      floor: 0,
    };
    this.displayQuiz = this.displayQuiz.bind(this);
    this.displayQuestion = this.displayQuestion.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  componentDidMount() {
    this.displayQuiz();
    this.setTimer();
  }

  shouldComponentUpdate(_props, state) {
    if (state.ceil) {
      return false;
    }
  }

  onClickAnswer() {
    const nextButton = document.querySelector('.btn');
    const buttons = document.querySelectorAll('.answer-buttons');
    buttons.forEach((button) => {
      if (button.id === 'correct-answer') {
        button.classList.add('correct');
      } else button.classList.add('wrong');
    });
    nextButton.classList.remove('isVisible');
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
    console.log(quizFromRedux);
    return quizFromRedux.length > 0 ? this.setState({ loading: false }) : null;
  }

  // source: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  checkCorrect(item, correct, index) {
    if (item === correct) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  displayQuestion() {
    const { quizFromRedux } = this.props;
    console.log(quizFromRedux);
    const { index } = this.state;
    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect = [] } = quizFromRedux[index];

    const sortedArray = [correct, ...incorrect];
    this.shuffleArray(sortedArray);
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <br />
        <p data-testid="question-text">{ question }</p>
        <ul>
          { sortedArray.map((item, i) => (
            <li
              key={ item }
              className="answer-buttons"
            >
              <button
                id={ this.checkCorrect(item, correct, i) }
                data-testid={ this.checkCorrect(item, correct, i) }
                className="answer-buttons"
                type="button"
                onClick={ this.onClickAnswer }
              >
                {item}

              </button>
            </li>)) }
        </ul>
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
    const { loading, redirect, index, ceil, floor } = this.state;
    const redirectNumber = 4;

    return (
      <div>
        {ceil}
        {ceil === floor ? 'Acabou o tempo' : null}
        { loading ? <Loading /> : this.displayQuestion()}
        <button
          onClick={ this.handleClick }
          type="button"
          className="isVisible btn btn-primary"
          id="next-button"
          data-testid="btn-next"
        >
          { index < redirectNumber ? 'Proxima' : 'Ver Pontuação' }
        </button>
        { redirect ? <Redirect to="/score" /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizFromRedux: state.quizReducer.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  quizToRedux: () => dispatch(getQuiz()),
});

Questions.propTypes = {
  quizFromRedux: PropTypes.arrayOf(PropTypes.string).isRequired,
  quizToRedux: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
