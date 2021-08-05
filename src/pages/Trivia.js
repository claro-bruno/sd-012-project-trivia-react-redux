import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      trivias: '',
      loading: true,
    };

    this.makeTrivias = this.makeTrivias.bind(this);
    this.tokenRequire = this.tokenRequire.bind(this);
    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
  }

  // Funcao que é ativada após a att do componente, ela que faz o card da Trivia.
  makeTrivias() {
    const { trivias } = this.state;
    return (
      <>
        <h1 data-testid="question-category">
          { trivias[0].category }
        </h1>
        <h2 data-testid="question-text">
          { trivias[0].question }
        </h2>
        <button data-testid="correct-answer" type="button">
          { trivias[0].correct_answer }
        </button>
        { trivias[0].incorrect_answers.map((wrongAnswer, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ wrongAnswer }
            type="button"
          >
            { wrongAnswer }
          </button>
        )) }
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
