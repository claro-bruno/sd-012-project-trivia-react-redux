import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

const SCORE_NUMBER = 3;
// const saveScore = localStorage.getItem(keyName);
// const rightQuestions = localStorage.getItem(keyName);

class Feedback extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   score: saveScore,
    //   questionsRight: rightQuestions,
    //   pageLogin: false,
    //   pageRanking: false,
    // };

    this.clickLogin = this.clickLogin.bind(this);
    this.clickRanking = this.clickRanking.bind(this);
  }

  clickLogin() {
    // this.setState({ pageLogin: true });
  }

  clickRanking() {
    // this.setState({ pageRanking: true });
  }

  render() {
    const { score, questionsRight } = this.props;
    if (questionsRight < SCORE_NUMBER) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    if (questionsRight >= SCORE_NUMBER) return <p data-testid="feedback-text">Mandou bem!</p>;
    // if (pageLogin) return <Redirect to="/login" />;
    return (
      <>
        <div>
          <h1>Desempenho</h1>
        </div>
        <Header />
        <div>
          <h3 data-testid="feedback-total-score">
            Pontuação final: $
            {score}
          </h3>
          <h3 data-testid="feedback-total-question">
            Número de acertos: $
            {questionsRight}
          </h3>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.clickLogin }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.clickRanking }
          >
            Ver Ranking
          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  questionsRight: PropTypes.number.isRequired,
};

export default Feedback;
