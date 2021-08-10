import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../Components/Loading';
import Answers from '../Components/Answers';
import HeaderGame from '../Components/HeaderGame';
import { actionFetchApiGame, showAnswers } from '../redux/actions';
import Timer from '../Components/timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      isAnswered: false,
      timer: 30,
      result: 0,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.btnNext = this.btnNext.bind(this);
    this.incorrectAndCorrectQuestion = this.incorrectAndCorrectQuestion.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.savingPoints = this.savingPoints.bind(this);
  }

  componentDidMount() {
    const { fetchApiGame, token } = this.props;
    fetchApiGame(token);
  }

  setLocalStorage() {
    const { player: jogador } = this.state;
    localStorage.setItem('state', JSON.stringify({ player: jogador }));
  }

  savingPoints(correct) {
    const { timer, index } = this.state;
    const { questions: { results } } = this.props;
    const { difficulty } = results[index];
    const ten = 10;
    let result = 0;
    if (correct === 'true') {
      switch (difficulty) {
      case 'easy':
        result = ten + (timer * 1);
        break;
      case 'medium':
        result = ten + (timer * 2);
        break;
      case 'hard':
        result = ten + (timer * Number('3'));
        break;
      default:
        console.log('erro no switch');
      }
      this.setState((prevState) => ({
        player: {
          ...prevState.player,
          assertions: prevState.player.assertions + 1,
        },
      }));
    }
    return result;
  }

  handleClick(correct) {
    const resultado = this.savingPoints(correct);
    this.setState((prevState) => ({
      isAnswered: true,
      timer: 0,
      result: prevState.result + resultado,
      player: {
        ...prevState.player,
        score: prevState.result + resultado,
        assertions: prevState.player.assertions,
      },
    }), () => {
      console.log(this.state);
      this.setLocalStorage();
    });
  }

  showNextQuestion() {
    const { sendShowAnswers } = this.props;
    this.setState((state) => ({
      index: state.index + 1,
    }));
    sendShowAnswers(false);
  }

  // requisito 10
  btnNext() {
    const { history: { push } } = this.props;
    const { index } = this.state;
    const numberQuestions = 4;
    const { show } = this.props;

    if (show && index < numberQuestions) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.showNextQuestion() }
        >
          Próxima
        </button>
      );
    }

    if (show && index === numberQuestions) {
      return (
        <button
          type="button"
          onClick={ () => push('/') } // fazer push para a tela de feedback
        >
          Ver Resultado
        </button>
      );
    }
  }

  incorrectAndCorrectQuestion() {
    const { sendShowAnswers } = this.props;
    sendShowAnswers(true);
    this.btnNext();
    this.handleClick();
  }

  render() {
    const { questions, isFetching, show } = this.props;
    const { index } = this.state;
    if (isFetching) return <Loading />;

    return (
      <>
        <HeaderGame />
        {
          questions.length > 0 ? (
            <section className="App">
              <Timer />
              <div>
                <p data-testid="question-category">
                  <strong>Categoria: </strong>
                  { questions[index].category }
                </p>
                <h3 data-testid="question-text">
                  <strong>Pergunta: </strong>
                  { questions[index].question }
                </h3>
                <Answers
                  show={ show }
                  question={ questions[index] }
                  onClick={ () => this.incorrectAndCorrectQuestion() }
                />
              </div>
              { this.btnNext() }
            </section>
          )
            : <Loading />
        }
      </>
    );
  }
}

Game.propTypes = {
  fetchApiGame: PropTypes.func.isRequired,
  history: PropTypes.objectOf().isRequired,
  isFetching: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  sendShowAnswers: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
  indexQuestion: state.gameReducer.indexQuestion,
  token: state.player.token,
  show: state.answers.show,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiGame: (token) => dispatch(actionFetchApiGame(token)),
  sendShowAnswers: (show) => dispatch(showAnswers(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
