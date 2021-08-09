import React from 'react';
import { Redirect } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
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
          onClick={ this.changeRoute }
        >
          Ver Ranking
        </button>
        { redirect && (<Redirect to="ranking" />) }
      </div>
    );
  }
}

export default Feedback;
