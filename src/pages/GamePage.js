import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameQuestions from '../components/GameQuestions';
import HeaderPlayer from '../components/HeaderPlayer';

class GamePage extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      counter: 0,
      loading: true,
      time: 30,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.timer = this.timer.bind(this);
    this.sendNextQuestion = this.sendNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    this.timer();
  }

  async fetchQuestions() {
    const { userInfo: { token } } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  timer() {
    const oneSecond = 1000;
    setInterval(
      () => this.setState(
        (prevState) => ({ time: prevState.time > 0 ? prevState.time - 1 : 0 }),
      ), oneSecond,
    );

  sendNextQuestion() {
    this.setState((prevstate) => ({ counter: prevstate.counter + 1 }));

  }

  render() {
    const { questions, counter, loading, time } = this.state;

    return (
      <main>
        <HeaderPlayer />
        <p>{time}</p>
        {loading
          ? 'Loading'
          : (
            <GameQuestions
              nextQuestion={ this.nextQuestion }
              questionObj={ questions[counter] }
              time={ time }
            />
          )}
      </main>
    );
  }
}

GamePage.propTypes = {
  userInfo: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(GamePage);
