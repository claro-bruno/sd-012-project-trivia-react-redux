import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from './Timer';
import Loading from './Loading';
import '../styles/Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivias: '',
      loading: true,
      indexQuestion: 0,
      activeButton: false,
    };

    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.makeTrivias = this.makeTrivias.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
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

  changeColorAnswer() {
    this.setState({
      activeButton: true,
    });
  }

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
        { indexQuestion === questionsLimit ? this.redirectToFeedback() : 'TRALALA' }
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

  // Funcao que altera o estado indexQuestion, fazendo assim com que as perguntas mudem. Essa funcao eh chamada apos o clique em qualquer um dos botoes de resposta.

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
      activeButton: false,
    });
  }

  makeTrivias() {
    const { trivias, indexQuestion, activeButton } = this.state;
    const { disabled } = this.props;
    return (
      <>
        <Timer />
        <h1 data-testid="question-category">{ trivias[indexQuestion].category }</h1>
        <h2 data-testid="question-text">{ trivias[indexQuestion].question }</h2>
        <ol>
          <li>
            <button
              id="correct"
              data-testid="correct-answer"
              type="button"
              onClick={ this.changeColorAnswer }
              disabled={ disabled }
              className={ activeButton ? 'green-border' : '' }
            >
              { trivias[indexQuestion].correct_answer }
            </button>
          </li>
          { trivias[indexQuestion].incorrect_answers.map(((wrongAnswer, index) => (
            <li key={ index }>
              <button
                name="incorrect"
                type="button"
                data-testid={ `wrong-answer-${index}` }
                className={ activeButton ? 'red-border' : '' }
                onClick={ this.changeColorAnswer }
                disabled={ disabled }
              >
                { wrongAnswer }
              </button>
            </li>
          ))) }
        </ol>
        { this.activeButtonNext() }
      </>
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
  timeValue: state.timer.time,
  disableValue: state.timer.disabled,
  load: state.user.load,
  token: state.user.token,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  time: PropTypes.number,
  disabled: PropTypes.bool,
}.isRequired;
