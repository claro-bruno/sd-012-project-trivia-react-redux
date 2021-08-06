import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import Loading from './Loading';
import '../Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivias: '',
      indexQuestion: 0,
      activeButton: true,
      loading: true,
    };

    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
  }

  // Funcao que ativa o botao de Proxima pergunta, o botao eh ativado independente da resposta ser errada ou certa
  activeButtonNext() {
    const { activeButton } = this.state;

    if (activeButton) {
      return true;
    }
    return false;
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
      activeButton: true,
    });

    const correctAnswer = document.getElementById('correct');
    const incorrectAnswers = document.getElementsByName('incorrect');
    correctAnswer.className = ('button-correct');
    correctAnswer.disable = false;
    incorrectAnswers.disable = false;
  }

  // REQUISITO 7 - FUNÇÃO PARA ALTERAR A COR DAS ALTERNATIVAS
  changeColorAnswer() {
    const correctAnswer = document.getElementById('correct');
    const incorrectAnswers = document.getElementsByName('incorrect');

    correctAnswer.className = 'green-border';
    incorrectAnswers.forEach((question) => {
      question.className = 'red-border';
    });
    correctAnswer.disable = true;
    incorrectAnswers.disable = true;
    this.activeButtonNext();
  }

  async tokenRequire() {
    const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchAPI.json();
    const { token } = response;
    localStorage.setItem('token', JSON.stringify(token));

    this.fetchQuestionsAndAnswers();
  }

  // Faz requisicao para API e guarda chave Results no estado da pagina.
  async fetchQuestionsAndAnswers() {
    let token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      await this.tokenRequire();
      token = JSON.parse(localStorage.getItem('token'));
    }

    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const fetchAPI = await fetch(url);
    const response = await fetchAPI.json();
    const { results } = response;

    this.setState({
      trivias: results,
      loading: false,
    });
  }

  // Funcao que é ativada após a att do componente, ela que faz o card da Trivia. Ela eh chamada apos o clique no botao Proxima
  makeTrivias() {
    const { trivias, indexQuestion, activeButton } = this.state;
    const { disabled } = this.props;
    const questionsLimit = 4;
    return (
      <>
        <Timer />
        <h1 data-testid="question-category">{ trivias[indexQuestion].category }</h1>
        <h2 data-testid="question-text">{ trivias[indexQuestion].question }</h2>
        <button
          id="correct"
          className="button-correct"
          data-testid="correct-answer"
          type="button"
          onClick={
            () => (this.setState({ activeButton: false },
              () => this.changeColorAnswer()))
          }
          disabled={ disabled }
        >
          { trivias[indexQuestion].correct_answer }
        </button>

        { trivias[indexQuestion].incorrect_answers.map((wrongAnswer, index) => (
          <button
            name="incorrect"
            type="button"
            data-testid={ `wrong-answer-${index}` }
            className="button-incorrect"
            key={ wrongAnswer }
            onClick={ () => (this.setState({ activeButton: false },
              () => this.changeColorAnswer())) }
            disabled={ disabled }
          >
            { wrongAnswer }
          </button>
        )) }
        <button
          className={ activeButton ? 'nextButton' : '' }
          disabled={ this.activeButtonNext() }
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextQuestion() }
        >
          { indexQuestion === questionsLimit ? this.redirectToFeedback() : 'Próxima' }
        </button>
      </>
    );
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        { this.makeTrivias() }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  timeValue: state.timer.time,
  disableValue: state.timer.disabled,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  time: PropTypes.number,
  disabled: PropTypes.bool,
}.isRequired;
