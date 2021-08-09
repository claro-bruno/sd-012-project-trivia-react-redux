import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Game extends Component {
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
      <div data-testid="ranking-title">
        Ranking
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.changeRoute }
        >
          Jogar Novamente
        </button>
        { redirect && (<Redirect to="/" />) }
      </div>
    );
  }
}
