import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

const SCORE_NUMBER = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      assertions: 0,
    };

    this.setValues = this.setValues.bind(this);
  }

  componentDidMount() {
    this.setValues();
  }

  setValues() {
    const stateLocal = JSON.parse(localStorage.getItem('state'));
    const { player } = stateLocal;
    const { score, assertions } = player;
    this.setState({
      score,
      assertions,
    });
  }

  render() {
    const { score, assertions } = this.state;
    return (
      <>
        <div>
          <h1>Desempenho</h1>
        </div>
        <Header />
        <div>
          <h3>
            Pontuação final:
            <p data-testid="feedback-total-score">{score}</p>
          </h3>
          <h3>
            Número de acertos:
            <p data-testid="feedback-total-question">{assertions}</p>
          </h3>
          {(assertions >= SCORE_NUMBER)
            ? <p data-testid="feedback-text">Mandou bem!</p>
            : <p data-testid="feedback-text">Podia ser melhor...</p> }
        </div>
        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
