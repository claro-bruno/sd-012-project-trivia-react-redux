import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Trivia from '../components/Trivia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      indexQuestion: 0,
      error: false,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const { token, numeroQuestoes, difficulty, type, category } = this.props;
    const API = `https://opentdb.com/api.php?amount=${numeroQuestoes}&token=${token}&difficulty=${
      difficulty || 0
    }&type=${type || 0}&category=${category || 0}`;
    fetch(API)
      .then((resolve) => resolve.json())
      .then((resolve) => {
        console.log(resolve);
        if (resolve.response_code === 0) {
          this.setState({
            questions: resolve.results,
            error: null,
          });
        } else {
          this.setState({
            error: true,
          });
        }
      });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
    }));
  }

  render() {
    const { questions, indexQuestion, error } = this.state;
    if (error === false) return <div>Carregando...</div>;
    if (error === true) {
      const errorMessage = 'Não existe questões suficientes com essas especificações';
      return (
        <div>
          <h2 className="message-erro">{errorMessage}</h2>
          <Link to="/">
            <button type="button">
              Voltar ao Início
            </button>
          </Link>
        </div>
      );
    }

    if (questions.length === indexQuestion) return <Redirect to="/feedback" />;
    return (
      <div className="Game">
        <Header />
        <Trivia
          key={ indexQuestion }
          trivia={ questions[indexQuestion] }
          onClick={ this.nextQuestion }
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.buttonReducer.token,
  numeroQuestoes: state.buttonReducer.numeroQuestoes,
  difficulty: state.buttonReducer.difficulty,
  type: state.buttonReducer.type,
  category: state.buttonReducer.category,
});

Game.defaultProps = {
  difficulty: null,
  type: undefined,
  category: undefined,
};

Game.propTypes = {
  token: PropTypes.string.isRequired,
  numeroQuestoes: PropTypes.number.isRequired,
  difficulty: PropTypes.number,
  type: PropTypes.number,
  category: PropTypes.number,
};

export default connect(mapStateToProps)(Game);
