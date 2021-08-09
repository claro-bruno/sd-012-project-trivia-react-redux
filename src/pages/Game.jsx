import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import '../css/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      indexQuestion: 0,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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

  nextQuestion() {
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
    }));
  }

  render() {
    const { questions, indexQuestion } = this.state;
    if (questions.length < 1) return <div>Carregando...</div>;
    if (questions.length === indexQuestion) return <Redirect to="/feedback" />;
    return (
      <div className="Game">
        <Header />
        <Trivia
          key={ indexQuestion }
          trivia={ questions[indexQuestion] }
          onClick={ this.nextQuestion }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ token: state.buttonReducer.token });

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
