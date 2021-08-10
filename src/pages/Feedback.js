import React from 'react';
import { Redirect } from 'react-router-dom';
import FeedbackText from '../component/FeedbackText';
import FeedbackInfo from '../component/FeedbackInfo';
import './Feedback.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirect2: false,
    };
    this.changeRoute = this.changeRoute.bind(this);
    this.changeRoutes = this.changeRoutes.bind(this);
  }

  changeRoute() {
    this.setState({ redirect: true });
  }

  changeRoutes() {
    this.setState({ redirect2: true });
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { score, gravatarEmail, name } = player;
    const { redirect, redirect2 } = this.state;
    return (
      <div className="feed">
        <FeedbackText />
        <h3 data-testid="feedback-text">Resumo da Partida</h3>
        <header className="feedback-header">
          <h1 data-testid="header-player-name">{ name }</h1>
          <img
            className="gravatar"
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt="Foto do Usuario"
          />
          <h1 data-testid="header-score">{ score }</h1>
        </header>
        <FeedbackInfo />
        <div className="btn-container">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.changeRoute }
            className="btn-play-again"
          >
            Jogar Novamente
          </button>
          { redirect && (<Redirect to="/" />) }
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.changeRoutes }
            className="btn-ranking"
          >
            Ver Ranking
          </button>
          { redirect2 && (<Redirect to="/ranking" />) }
        </div>
      </div>
    );
  }
}

export default Feedback;
