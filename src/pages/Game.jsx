import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const numeroQuestoes = 5;
    const { token } = this.props;
    const API = `https://opentdb.com/api.php?amount=${numeroQuestoes}&token=${token}`;
    fetch(API)
      .then((resolve) => resolve.json())
      .then((resolve) => this.setState({
        questions: resolve.results,
      }));
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        {questions.map((question, index) => <Trivia key={ index } trivia={ question } />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ token: state.buttonReducer.token });

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
