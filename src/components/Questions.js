import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import { getScoreAction } from '../actions';
import '../styles/Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivias: '',
      loading: true,
      indexQuestion: 0,
      activeButton: false,
      disabled: false,
      time: 30,
      score: 0,
      asserts: 0,
      arrayOfQuestions: [],
    };

    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
    this.showButtonNext = this.showButtonNext.bind(this);
    this.makeTrivias = this.makeTrivias.bind(this);
    this.questionTimer = this.questionTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.makeProps = this.makeProps.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
    this.questionTimer();
  }

  makeProps() {
    const { score, asserts } = this.state;
    const { getScore } = this.props;

    getScore(score, asserts);
  }

  // Faz requisicao para API e guarda chave Results no estado da pagina.
  async fetchQuestionsAndAnswers() {
    const { token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const fetchAPI = await fetch(url);
    const response = await fetchAPI.json();
    const { results } = response;

    this.setState({
      trivias: results,
      loading: false,
    });
  }

  // Renderiza botao de proxima pergunta. Esta sendo chamado na func MakeTrivias. O botao aparece quando o estado activeButton é setado para true.
  activeButtonNext() {
    const { activeButton, indexQuestion } = this.state;
    const questionsLimit = 4;
    return (
      <button
        className={ activeButton ? '' : 'nextButton' }
        type="button"
        data-testid="btn-next"
        onClick={ () => this.nextQuestion() }
      >
        { indexQuestion === questionsLimit ? this.redirectToFeedback() : 'Próxima' }
      </button>
    );
  }

  redirectToFeedback() {
    return (
      <Link to="/feedback">
        Próxima
      </Link>
    );
  }

  // Funcao que conta 30 segundos para responder a pergunta
  questionTimer() {
    const plus = 1000;
    const questionTimer = setInterval(() => {
      const { time } = this.state;
      this.setState({
        time: time - 1,
      });
      if (time <= 0) {
        clearInterval(questionTimer);
        this.setState({
          disabled: true,
          time: 'Tempo Esgotado',
          activeButton: true,
        });
      }
    }, plus);
  }

  // Funcao que altera o estado indexQuestion, fazendo assim com que as perguntas mudem. Essa funcao eh chamada apos o clique em qualquer um dos botoes de resposta. Apos alterar o estado, ela evoca a QuestionTimer.
  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
      activeButton: false,
      disabled: false,
      time: 30,
      arrayOfQuestions: [],
    }, () => this.questionTimer());
  }

  // Seta estado ActiveButton para true apos o clique em algum dos botoes de resposta. Isso faz com que o botao de Proxima Questao aparece.
  showButtonNext() {
    this.setState({
      activeButton: true,
      disabled: true,
    });
  }

  teste(answer) {
    const { activeButton, indexQuestion, trivias } = this.state;
    const correctAnswer = trivias[indexQuestion].correct_answer;

    if (activeButton) {
      return (answer === correctAnswer ? 'green-border' : 'red-border');
    }
  }

  calculateScore() {
    const { time, trivias, indexQuestion, score, asserts } = this.state;
    const easy = 'easy';
    const medium = 'medium';
    const hard = 'hard';
    const three = 3;
    const baseValue = 10;
    const questionDificulty = trivias[indexQuestion].difficulty;
    switch (questionDificulty) {
    case easy:
      this.setState({
        score: score + baseValue + (1 * time),
        asserts: asserts + 1,
        activeButton: true,
        disabled: true,
      }, () => this.makeProps());
      break;
    case medium:
      this.setState({
        score: score + baseValue + (2 * time),
        asserts: asserts + 1,
        activeButton: true,
        disabled: true,
      }, () => this.makeProps());
      break;
    case hard:
      this.setState({
        score: score + baseValue + (three * time),
        asserts: asserts + 1,
        activeButton: true,
        disabled: true,
      }, () => this.makeProps());
      break;
    default:
      this.state({
        activeButton: true,
        disabled: true,
      });
    }
  }

  makeTrivias() { // Renderiza Perguntas da Trivia.
    const { trivias, indexQuestion, disabled, arrayOfQuestions, time } = this.state;
    const randomizator = 0.5;
    let allQuestions = [trivias[indexQuestion].correct_answer,
      ...trivias[indexQuestion].incorrect_answers];
    const correctAnswer = trivias[indexQuestion].correct_answer;
    const buttons = arrayOfQuestions.length > 0
      ? arrayOfQuestions
      : allQuestions = allQuestions.sort(() => Math.random() - randomizator);
    if (arrayOfQuestions.length === 0) {
      this.setState({
        arrayOfQuestions: buttons,
      });
    }
    return (
      <div>
        <span className="timer">{ time }</span>
        <h1 data-testid="question-category">{ trivias[indexQuestion].category }</h1>
        <div className="question-box">
          <div className="left-questions">
            <h2 data-testid="question-text">{ trivias[indexQuestion].question }</h2>
          </div>
          <div className="right-questions">
            <ol>
              { buttons.map(((answer, index) => (
                <li key={ index }>
                  <button
                    name="incorrect"
                    type="button"
                    className={ `${this.teste(answer)} answers` }
                    onClick={ answer === correctAnswer
                      ? this.calculateScore : this.showButtonNext }
                    disabled={ disabled }
                    data-testid={ answer === correctAnswer
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    { answer }
                  </button>
                </li>
              ))) }
            </ol>
            <div className="btn-next-div">
              { this.activeButtonNext() }
            </div>
          </div>
        </div>
      </div>
    );
  }

  makeTriviasRender() {
    const { loading } = this.state;
    return loading ? <h1>Loading await...</h1> : this.makeTrivias();
  }

  render() {
    const { load } = this.props;
    return load ? <Loading /> : this.makeTriviasRender();
  }
}

const mapStateToProps = (state) => ({
  load: state.user.load,
  token: state.user.token,
});

const mapDispatchToprops = (dispatch) => ({
  getScore: (scoreValue, assertsValue) => dispatch(
    getScoreAction(scoreValue, assertsValue),
  ),
});

export default connect(mapStateToProps, mapDispatchToprops)(Questions);

Questions.propTypes = {
  timeValue: PropTypes.number,
  disabledValue: PropTypes.bool,
}.isRequired;
