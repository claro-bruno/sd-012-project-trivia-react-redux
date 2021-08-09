import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchApiGame } from '../redux/actions';
import Loading from '../Components/Loading';
import Answers from '../Components/Answers';
import HeaderGame from '../Components/HeaderGame';
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
    this.showBtnNext = this.showBtnNext.bind(this);
  }

  componentDidMount() {
    const { fetchApiGame, token } = this.props;
    fetchApiGame(token);
  }

  showNextQuestion() {
    this.setState((state) => ({
      index: state.index + 1,
    }));
  }

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

  showBtnNext() {
    const { questions } = this.props;
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

  incorrectAndCorrectQuestion() {
    this.showNextQuestion();
  }

  render() {
    const { questions, isFetching } = this.props;
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
                  question={ questions[index] }
                  onClick={ this.incorrectAndCorrectQuestion }
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
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf().isRequired, //  precisa arrumar essa props
  push: PropTypes.func.isRequired, //  precisa arrumar essa props
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
  indexQuestion: state.gameReducer.indexQuestion,
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiGame: (token) => dispatch(actionFetchApiGame(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
