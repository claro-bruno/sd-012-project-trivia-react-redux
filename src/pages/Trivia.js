import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      trivias: '',
      loading: true,
      indexQuestion: 0,
      activeButton: true,
    };

    this.makeTrivias = this.makeTrivias.bind(this);
    this.tokenRequire = this.tokenRequire.bind(this);
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
  }

  // Funcao que é ativada após a att do componente, ela que faz o card da Trivia. Ela eh chamada apos o clique no botao Proxima
  makeTrivias() {
    const { trivias, indexQuestion, activeButton } = this.state;
    const questionsLimit = 4;
    return (
      <>
        <h1 data-testid="question-category">
          { trivias[indexQuestion].category }
        </h1>
        <h2 data-testid="question-text">
          { trivias[indexQuestion].question }
        </h2>
        <button
          data-testid="correct-answer"
          type="button"
          onClick={ () => (this.setState({ activeButton: false },
            () => this.activeButtonNext())) }
        >
          { trivias[indexQuestion].correct_answer }
        </button>
        { trivias[indexQuestion].incorrect_answers.map((wrongAnswer, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ wrongAnswer }
            onClick={ () => (this.setState({ activeButton: false },
              () => this.activeButtonNext())) }
            type="button"
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

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        {/* Funcao do console log infinito */}
        { this.makeTrivias() }
      </div>);
  }
}

export default Trivia;
