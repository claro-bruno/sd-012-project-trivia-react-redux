import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameQuestions from '../components/GameQuestions';
import HeaderPlayer from '../components/HeaderPlayer';
import { timeReset } from '../redux/actions';
import ErrorPage from './ErrorPage';
import Loading from '../components/Loading';

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
    const { userInfo: { token }, settings: { category, difficulty, type } } = this.props;
    console.log(category, difficulty, type);
    const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
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
    const { resetTimer } = this.props;
    this.setState((prevstate) => ({ counter: prevstate.counter + 1, answered: false }));
    resetTimer();
  }

  render() {
    const { questions, counter, loading, answered } = this.state;
    const MIN_QUESTIONS = 5;
    if (loading) return <Loading />;
    return (
      <>
        <HeaderPlayer />
        {questions.length < MIN_QUESTIONS
          ? <ErrorPage />
          : (
            <GameQuestions
              onAnswer={ this.questionAnswered }
              counter={ counter }
              answered={ answered }
              nextQuestion={ this.sendNextQuestion }
              questionObj={ questions[counter] }
            />
          )}
      </>
    );
  }
}

GamePage.propTypes = {
  userInfo: PropTypes.objectOf(Object).isRequired,
  settings: PropTypes.objectOf(Object).isRequired,
  resetTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  resetTimer: () => dispatch(timeReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
