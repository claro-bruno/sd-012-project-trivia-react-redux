import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
      disabled: false,
      time: 30,
    };

    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
    this.makeActiveButtonToTrue = this.makeActiveButtonToTrue.bind(this);
    this.makeTrivias = this.makeTrivias.bind(this);
    this.questionTimer = this.questionTimer.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
    this.questionTimer();
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

  makeActiveButtonToTrue() {
    this.setState({
      activeButton: true,
      disabled: true,
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

  // Funcao que altera o estado indexQuestion, fazendo assim com que as perguntas mudem. Essa funcao eh chamada apos o clique em qualquer um dos botoes de resposta.

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
      activeButton: false,
      disabled: false,
      time: 30,
    }, () => this.questionTimer());
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

  makeTrivias() {
    const { trivias, indexQuestion, activeButton, disabled, time } = this.state;
    return (
      <>
        <span id="timer">{ time }</span>
        <h1 data-testid="question-category">{ trivias[indexQuestion].category }</h1>
        <h2 data-testid="question-text">{ trivias[indexQuestion].question }</h2>
        <ol>
          <li>
            <button
              id="correct"
              data-testid="correct-answer"
              type="button"
              onClick={ this.makeActiveButtonToTrue }
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
                onClick={ this.makeActiveButtonToTrue }
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
  load: state.user.load,
  token: state.user.token,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  timeValue: PropTypes.number,
  disabledValue: PropTypes.bool,
}.isRequired;
