import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Jogar de novo
        </button>
        { redirect ? <Redirect to="/" /> : null }
      </div>
    );
  }
}

export default Ranking;
