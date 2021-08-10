import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../Components/Loading';
import Answers from '../Components/Answers';
import HeaderGame from '../Components/HeaderGame';
import { actionFetchApiGame, showAnswers } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      currentTime: 30,
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
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.savingPoints = this.savingPoints.bind(this);
  }

  componentDidMount() {
    const { fetchApiGame, token } = this.props;
    fetchApiGame(token);
    this.changeCurrentTime();
  }

  changeCurrentTime() {
    const updateTime = 1000;
    const limitTime = 30000;

    setInterval(() => {
      const { currentTime } = this.state;
      if (currentTime > 0) this.setState({ currentTime: currentTime - 1 });
    }, updateTime);

    setTimeout(() => {
      this.disableBtn();
    }, limitTime);
  }

  disableBtn() {
    const answerBtn = document.querySelectorAll('.answer-btn');
    answerBtn.forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  }

  setLocalStorage() {
    const { player: jogador } = this.state;
    localStorage.setItem('state', JSON.stringify({ player: jogador }));
  }

  savingPoints(correct) {
    console.log(correct);
    const { timer, index } = this.state;
    const { questions } = this.props;
    // console.log(this.props.questions);
    const { difficulty } = questions[index];
    console.log(difficulty);
    const ten = 10;
    let result = 0;
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
      break;
    }
    this.setState((prevState) => ({
      player: {
        ...prevState.player,
        assertions: prevState.player.assertions + 1,
      },
    }));
    return result;
  }

  handleClick(correct) {
    if (correct === 'correct') {
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
        this.setLocalStorage();
      });
    }
    console.log(this.state);
  }

  showNextQuestion() {
    const { sendShowAnswers } = this.props;
    this.setState((state) => ({
      index: state.index + 1,
      currentTime: 30,
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
          data-testid="btn-next"
          onClick={ () => push('/feedback') } // fazer push para a tela de feedback
        >
          Ver Resultado
        </button>
      );
    }
  }

  incorrectAndCorrectQuestion(answer) {
    const { sendShowAnswers } = this.props;
    sendShowAnswers(true);
    // console.log(answer[0]);
    this.btnNext();
    this.handleClick(answer);
  }

  render() {
    const { questions, isFetching, show } = this.props;
    const { index, currentTime } = this.state;
    if (isFetching) return <Loading />;

    return (
      <>
        <HeaderGame />
        {
          questions.length > 0 ? (
            <section className="App">
              {currentTime }
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
                  onClick={ (
                    { target: { name } },
                  ) => this.incorrectAndCorrectQuestion(name) }
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
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
