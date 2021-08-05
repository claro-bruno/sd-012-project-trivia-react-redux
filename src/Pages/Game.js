import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchApiGame } from '../redux/actions';
import Loading from '../components/Loading';
import Answers from '../components/Answers';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.showNextQuestion = this.showNextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchApiGame } = this.props;
    fetchApiGame();
  }

  showNextQuestion() {
    this.setState((state) => ({
      index: state.index + 1,
    }));
  }

  render() {
    const { questions, isFetching, history: { push } } = this.props;
    const { index } = this.state;

    if (isFetching) return <Loading />;

    const numberQuestions = 5;

    return (
      index < numberQuestions ? (
        <section className="App">
          <div>
            <p data-testid="question-category">
              { questions[index].category }
            </p>
            <h3 data-testid="question-text">
              { questions[index].question }
            </h3>
            <Answers question={ questions[index] } />
          </div>
          <button
            type="button"
            onClick={ () => this.showNextQuestion(questions) }
          >
            Próxima Pergunta
          </button>

        </section>
      )
        : (
          <section className="App">
            <button
              type="button"
              onClick={ () => push('/') } // fazer push para a tela de feedback
            >
              Ver Resultado
            </button>
          </section>
        )
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
};

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
  indexQuestion: state.gameReducer.indexQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiGame: () => dispatch(actionFetchApiGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
