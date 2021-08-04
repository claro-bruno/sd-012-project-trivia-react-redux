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
    };

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

  sendNextQuestion() {
    this.setState((prevstate) => ({ counter: prevstate.counter + 1 }));
  }

  render() {
    const { questions, counter, loading } = this.state;

    return (
      <main>
        <HeaderPlayer />
        {loading
          ? 'Loading'
          : <GameQuestions
              nextQuestion={ this.nextQuestion }
              questionObj={ questions[counter] }
          />}
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
