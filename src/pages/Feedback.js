import React from 'react';
import { Redirect } from 'react-router-dom';
import FeedbackText from '../component/FeedbackText';
import FeedbackInfo from '../component/FeedbackInfo';

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
      <>
        <header>
          <h1 data-testid="feedback-text">Feedbacks</h1>
          <img
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt="Foto do Usuario"
          />
          <span data-testid="header-score">{ score }</span>
          <span data-testid="header-player-name">{ name }</span>
        </header>
        <div>
          <FeedbackText />
          <FeedbackInfo />
        </div>
        <div>
          <h1 data-testid="feedback-text">Feedbacks</h1>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.changeRoute }
          >
            Jogar Novamente
          </button>
          { redirect && (<Redirect to="/" />) }
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.changeRoutes }
          >
            Ver Ranking
          </button>
          { redirect2 && (<Redirect to="/ranking" />) }
        </div>
      </>
    );
  }
}

export default Feedback;
