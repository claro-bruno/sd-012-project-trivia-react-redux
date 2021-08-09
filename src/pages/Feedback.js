import React from 'react';
import { Redirect } from 'react-router-dom';

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
    const { redirect, redirect2 } = this.state;
    return (
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
    );
  }
}

export default Feedback;
