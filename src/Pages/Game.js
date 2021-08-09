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
    };
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.btnNext = this.btnNext.bind(this);
    this.incorrectAndCorrectQuestion = this.incorrectAndCorrectQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchApiGame, token } = this.props;
    fetchApiGame(token);
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
    const { questions, history: { push } } = this.props;
    const { index } = this.state;
    const numberQuestions = 4;

    if (index !== 0 && index < numberQuestions) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.showNextQuestion(questions) }
        >
          Próxima
        </button>
      );
    }
    if (index !== 0 && index > numberQuestions) {
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

  page(params) {
    const { show, questions, sendShowAnswers, push, index, numberQuestions,
    } = params;
    return (
      <>
        <HeaderGame />
        { questions.length > 0 ? (
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
                  sendShowAnswers={ sendShowAnswers }
                />
              </div>
              { this.btnNext() }
            </section>
        ) : (
          <Loading />
        )}
      </>
    );
  }

  render() {
    const {
      show,
      questions,
      isFetching,
      sendShowAnswers,
      history: { push },
    } = this.props;
    const { index } = this.state;
    const numberQuestions = 4;
    if (isFetching) return <Loading />;
    return this.page({
      show,
      questions,
      sendShowAnswers,
      push,
      index,
      numberQuestions,
    });
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
