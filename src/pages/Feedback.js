import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { assertions, score } = this.props;
    const scoreBenchmark = 3;
    const lowerAssertionsText = 'Podia ser melhor...';
    const highAssertionsText = 'Mandou bem!';
    const text1 = 'Acertou ';
    const text2 = ' perguntas.';
    const text3 = ' Seu placar foi ';

    if (redirectBeggining) {
      return <Redirect to="/" />;
    }
    if (redirectRanking) {
      return <Redirect to="/ranking" />;
    }
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions < scoreBenchmark ? lowerAssertionsText : highAssertionsText }
        </p>
        <p>
          { text1 }
          <span data-testid="feedback-total-question">{ assertions * 1 }</span>
          { text2 }
          { text3 }
          <span data-testid="feedback-total-score">{ score * 1 }</span>
        </p>
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

const mapStateToProps = (state) => ({
  assertions: state.quizReducer.assertions,
  score: state.quizReducer.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
