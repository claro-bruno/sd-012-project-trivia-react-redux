import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/feedback.css';
import mandouBem from '../images/silviosantos_mandouBem.gif';
import podiaSerMelhor from '../images/podia_ser_melhor.gif';

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
    this.playerRanking();
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

  playerRanking() {
    if (!localStorage.getItem('ranking')) {
      const list = [];
      localStorage.setItem('ranking', JSON.stringify(list));
    }
    const rankList = JSON.parse(localStorage.getItem('ranking'));
    const stateLocal = JSON.parse(localStorage.getItem('state'));
    const { player } = stateLocal;
    const { name, score, email } = player;
    const gravatar = this.criptEmail(email);
    rankList.push({ name, score, picture: gravatar });
    localStorage.setItem('ranking', JSON.stringify(rankList));
  }

  criptEmail(email) {
    const criptedEmail = md5(email).toString();
    return `https://www.gravatar.com/avatar/${criptedEmail}`;
  }

  mandouBem() {
    return (
      <div>
        <img className="mandou_bem" src={ mandouBem } alt="Silvio mandando beijo" />
        <p data-testid="feedback-text">Mandou bem!</p>
      </div>
    );
  }

  podiaSerMelhor() {
    return (
      <div>
        <img className="podiaMelhor" src={ podiaSerMelhor } alt="Silvio caindo" />
        <p data-testid="feedback-text">Podia ser melhor...</p>
      </div>
    );
  }

  render() {
    const { score, assertions } = this.state;
    return (
      <>
        <Header />
        <div className="body-feedback">
          <h1 className="titulo">Desempenho</h1>
        </div>
        <div className="main-content">
          <div>
            <h3>
              Pontuação final:
              <p data-testid="feedback-total-score">{score}</p>
            </h3>
            <h3>
              Número de acertos:
              <p data-testid="feedback-total-question">{assertions}</p>
            </h3>
          </div>
          <div>
            {(assertions >= SCORE_NUMBER)
              ? this.mandouBem()
              : this.podiaSerMelhor() }
          </div>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
