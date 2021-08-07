import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Answers from '../components/Answers';
import './Game.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      data: '',
      currentQuestion: 0,
      loading: true,
      shouldShowBtn: false,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.page = this.page.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.showBtnNextQuestion = this.showBtnNextQuestion.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleAnswers(data) {
    const splitNumber = 0.5;
    const answers = data.results.map((question) => {
      const wrongAnswers = question.incorrect_answers
        .map((option) => ({
          text: option,
          correct: false,
        }));
      const allAnswers = [
        ...wrongAnswers,
        {
          text: question.correct_answer,
          correct: true,
        },
      ];
      return allAnswers
        .sort(() => Math.random() - splitNumber); // código retirado de https://flaviocopes.com/
    });
    return answers;
  }

  async fetchApi() {
    const { token } = this.props;
    const apiUrl = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const answers = this.handleAnswers(data);
      this.setState({
        loading: false,
        data: {
          ...data,
          results: answers.map((answer, index) => ({
            ...data.results[index],
            answers: answer,
          })),
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  handleClickAnswer() {
    const incorrectList = document.getElementsByName('incorrect');
    const correctList = document.getElementById('correct');
    incorrectList.forEach((item) => { item.className = 'incorrect'; });
    correctList.className = 'correct';
    this.setState({
      shouldShowBtn: true,
    });
  }

  showBtnNextQuestion() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Next Question
      </button>
    );
  }

  page() {
    const { data,
      shouldShowBtn,
      currentQuestion,
    } = this.state;
    const { timeOff } = this.props;
    return (
      <>
        <Header />
        <fieldset>
          <h1
            data-testid="question-category"
          >
            {data.results[currentQuestion].category}
          </h1>
          <Timer />
          <h2
            data-testid="question-text"
          >
            {data.results[currentQuestion].question}
          </h2>
          <Answers
            data={ data }
            currentQuestion={ currentQuestion }
            timeOff={ timeOff }
            handleClickAnswer={ this.handleClickAnswer }
          />
          { shouldShowBtn && this.showBtnNextQuestion() }
        </fieldset>
      </>
    );
  }

  pageRender() {
    const { loading } = this.state;
    return loading ? <h1>Loading...</h1> : this.page();
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? <Loading /> : this.pageRender();
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.login.isLoading,
  token: state.login.token,
  timer: state.timerReducer.time,
  timeOff: state.timerReducer.timeOff,
});

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  timeOff: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
