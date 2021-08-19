import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store/index';
import { getQuestions, userQuestions, rightAnswers } from '../redux/actions/index';
import other from '../redux/other/other';
import Timer from '../components/Timer';
import Header from '../components/Header';
import './Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: 0,
      fetchAllAnswers: [],
      getAnswers: false,

    };
    this.timer = React.createRef();
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.next = this.next.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  async componentDidMount() {
    const { playerQuestions } = this.props;
    const { fetch } = this.state;
    const token = this.getToken();
    const api = await getQuestions(token);
    playerQuestions(api);
    this.fetchAnswers(api[fetch]);
    this.timer.current.start();
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  handleTimer() {
    this.setState({ getAnswers: true });
  }

  fetchAnswers(question) {
    const random = 0.5;
    const answers = [
      ...question.incorrect_answers.map((item) => ({
        answer: item,
        isLoading: false }
      )),
      { answer: question.correct_answer,
        isLoading: true,
      },
    ];
    const getRandom = answers.sort(() => Math.random() - random);
    this.setState({
      fetchAllAnswers: getRandom,
    });
  }

  handleClick(isLoading) {
    this.setState({
      getAnswers: true,
    });
    this.timer.current.stop();
    if (isLoading) {
      const response = this.timer.current.timer();
      this.playerPoints(response, 1);
    }
  }

  playerPoints(time, difficulty) {
    const init = 10;
    const points = init + (time * difficulty);
    const player = this.saveStoragePlayer();
    player.score += points;
    player.assertions += 1;
    localStorage.setItem('state', JSON.stringify({ player }));
    store.dispatch(rightAnswers(player));
  }

  next() {
    const { fetch } = this.state;
    const { questions } = this.props;
    const index = fetch + 1;
    const currentQuestion = questions[index];

    if (currentQuestion) {
      this.fetchAnswers(currentQuestion);
      this.setState(() => ({
        fetch: index,
        getAnswers: false,
      }));
      this.timer.current.reset();
      this.timer.current.start();
    } else {
      const { name, gravatarEmail, score } = this.saveStoragePlayer();
      other.saveScore(name, score, gravatarEmail);
      this.setState(() => ({
        fetch: index,
      }));
    }
  }

  saveStoragePlayer() {
    const json = localStorage.getItem('state');
    const { player } = JSON.parse(json);
    return player;
  }

  fetchQuestion(question) {
    const { getAnswers } = this.state;
    return (
      <section>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div className="answer-options">
          {this.renderAnswers()}
        </div>
        <button
          className={ getAnswers ? 'next-question' : 'next' }
          type="button"
          data-testid="btn-next"
          onClick={ this.next }
        >
          Next
        </button>
      </section>
    );
  }

  renderAnswers() {
    const { fetchAllAnswers, getAnswers } = this.state;
    return fetchAllAnswers.map(({ answer, isLoading }, key) => (
      <button
        type="button"
        className={ `answer-button
         ${getAnswers && (isLoading ? 'correct-answers' : 'incorrect-answers')}` }
        key={ answer }
        data-testid={ isLoading ? 'correct-answer' : `wrong-answer-${key}` }
        onClick={ () => this.handleClick(isLoading) }
        disabled={ getAnswers }
      >
        {answer}
      </button>
    ));
  }

  render() {
    const { fetch } = this.state;
    const { questions } = this.props;
    const current = questions[fetch];
    const array = fetch >= questions.length;
    if (fetch !== 0 && array) return <Redirect to="/feedback" />;
    return (
      <>
        <Header />
        <Timer ref={ this.timer } over={ this.handleTimer } />
        { current && this.fetchQuestion(current) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  playerQuestions: (questions) => dispatch(userQuestions(questions)),
});

Questions.propTypes = {
  playerQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
