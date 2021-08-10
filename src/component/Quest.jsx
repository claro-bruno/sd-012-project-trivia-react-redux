import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuest } from '../actions';
import Header from './Header';
import * as fetchAPI from '../helpers/fetchAPI';
import './Quest.css';

const count4 = 4;
const count5 = 5;
const correctAnswerId = 'correct-answer';
const wrongAnswerId = 'wrong-answer';

class Quest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
      timerId: null,
      click: 'off',
      count: 0,
    };
    this.timerRunner = this.timerRunner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { questsFn } = this.props;
    const token = localStorage.getItem('token');
    questsFn(token);
    this.timerRunner();
  }

  componentDidUpdate() {
    const { click } = this.state;
    if (click === 'on') {
      this.updateAssertions();
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  resetStyles() {
    const { count } = this.state;
    if (count <= count4) {
      const wrongButtons = document.getElementsByName(wrongAnswerId);
      const correctButton = document.getElementById(correctAnswerId);
      const nextButton = document.getElementById('btn-next');
      wrongButtons.forEach((button) => {
        button.className = wrongAnswerId;
      });
      correctButton.className = correctAnswerId;
      nextButton.className = 'hide';
    }
  }

  nextQuestion() {
    this.setState(({ count }) => ({
      count: count + 1,
    }), () => { this.timerRunner(); this.endTimerFunction(false); this.resetStyles(); });
  }

  timerRunner() {
    const oneSecond = 1000;
    const time = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        const newTime = timer - 1;
        this.setState({ timer: newTime });
      } else {
        this.endTimerFunction(true);
        clearInterval(time);
        const nextButton = document.getElementById('btn-next');
        nextButton.className = 'show';
      }
    }, oneSecond);
    this.setState(() => ({ timerId: time, timer: 30 }));
  }

  endTimerFunction(boolean) {
    const { count } = this.state;
    if (count <= count4) {
      const wrongButtons = document.getElementsByName(wrongAnswerId);
      const correctButton = document.getElementById(correctAnswerId);
      wrongButtons.forEach((button) => {
        button.className = 'wrong-answer-clicked wrong-answer';
        button.disabled = boolean;
      });

      correctButton.className = 'correct-answer-clicked correct-answer';
      correctButton.disabled = boolean;
    }
  }

  updateAssertions() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const { player } = JSON.parse(localStorage.getItem('state'));
    const newAssertions = (parseInt(assertions, 10) + 1);
    const updatedPlayer = {
      player: { ...player, assertions: newAssertions },
    };
    const playerstringfy = JSON.stringify(updatedPlayer);
    console.log(playerstringfy);
    localStorage.setItem('state', playerstringfy);
    this.updateScore();
  }

  updateScore() {
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    const { player } = JSON.parse(localStorage.getItem('state'));
    const fixNumber = 10;
    const { timer, count } = this.state;
    const { quests } = this.props;
    const { difficulty } = quests[count];
    const difMult = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const points = fixNumber + (timer * difMult[difficulty]);
    const olderPoints = parseInt(score, 10);
    const newPoints = points + olderPoints;
    const updatedPlayer = {
      player: { ...player, score: newPoints },
    };
    const playerstringfy = JSON.stringify(updatedPlayer);
    localStorage.setItem('state', playerstringfy);
    this.setState({ click: 'off' });
  }

  handleClick(event) {
    const { timerId } = this.state;

    this.endTimerFunction(true);
    const correctButton = document.getElementById(correctAnswerId);
    const nextButton = document.getElementById('btn-next');
    nextButton.className = 'show';
    clearInterval(timerId);

    if (event.target === correctButton) {
      this.setState({ click: 'on' });
    }
  }

  render() {
    const { quests, isLoading, name, email } = this.props;
    const { timer, count } = this.state;
    if (count === count5) return <Redirect to="/feedback" />;
    if (isLoading) return <div>Loading...</div>;
    const avatar = fetchAPI.fetAvatar(md5(email).toString());
    const {
      question, category, correct_answer: correctAnswer,
      incorrect_answers: incorret } = quests[count];
    return (
      <div className="game">
        <Header name={ name } avatar={ avatar } />
        <h2>{timer}</h2>
        <h4 data-testid="question-category">{ category }</h4>
        <h3 data-testid="question-text">{ question }</h3>
        <div className="answers-option">
          <button
            type="button"
            data-testid="correct-answer"
            id="correct-answer"
            onClick={ this.handleClick }
            className="correct-answer"
          >
            { correctAnswer }
          </button>
          { incorret.map((wrong, index) => (
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              Name="wrong-answer"
              className="wrong-answer"
              id="wrong-answer"
              onClick={ this.handleClick }
              key={ index }
            >
              { wrong }
            </button>)) }
          <button
            onClick={ this.nextQuestion }
            data-testid="btn-next"
            id="btn-next"
            type="button"
            className="hide"
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

Quest.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.object).isRequired,
  questsFn: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  quests: state.quest.quests,
  isLoading: state.quest.isLoading,
  name: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  questsFn: (quest) => dispatch(fetchQuest(quest)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
