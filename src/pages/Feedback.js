import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      redirectBeggining: false,
      redirectRanking: false,
    };
    this.redirectToBeggining = this.redirectToBeggining.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  redirectToBeggining() {
    this.setState({
      redirectBeggining: true,
    });
  }

  redirectToRanking() {
    this.setState({
      redirectRanking: true,
    });
  }
  //   A mensagem deve ser "Podia ser melhor..." caso a pessoa acerte menos de 3 perguntas
  //   A mensagem deve ser "Mandou bem!" caso a pessoa acerte 3 perguntas ou mais
  //   O elemento da mensagem de feedback deve possuir o atributo data-testid com o valor feedback-text

  render() {
    const { redirectBeggining, redirectRanking } = this.state;
    if (redirectBeggining) {
      return <Redirect to="/" />;
    }
    if (redirectRanking) {
      return <Redirect to="/ranking" />;
    }
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">MENSAGENS DE FEEDBACK</p>
        <button
          type="submit"
          onClick={ this.redirectToBeggining }
          data-testid="btn-play-again"
        >
          Jogar Novamente
        </button>
        <button
          type="submit"
          onClick={ this.redirectToRanking }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}
export default Feedback;
