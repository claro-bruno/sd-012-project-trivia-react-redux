import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameQuestions from '../components/GameQuestions';
import HeaderPlayer from '../components/HeaderPlayer';
import Timer from '../components/Timer';

class GamePage extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      counter: 0,
      loading: true,
      answered: false,
    };

    this.questionAnswered = this.questionAnswered.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.sendNextQuestion = this.sendNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
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

  questionAnswered() {
    this.setState({ answered: true });
  }

  sendNextQuestion() {
    this.setState((prevstate) => ({ counter: prevstate.counter + 1, answered: false }));
  }

  render() {
    const { questions, counter, loading, answered } = this.state;

    return (
      <main>
        <HeaderPlayer />
        <Timer />
        {loading
          ? 'Loading'
          : (
            <GameQuestions
              onAnswer={ this.questionAnswered }
              answered={ answered }
              nextQuestion={ this.sendNextQuestion }
              questionObj={ questions[counter] }
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
