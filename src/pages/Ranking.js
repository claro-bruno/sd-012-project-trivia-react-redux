import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RankingList from '../component/RankingList';
import gold from '../images/gold.png';
import silver from '../images/silver.png';
import bronze from '../images/bronze.png';

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
      <div data-testid="ranking-title" className="ranking-container">
        <h1>Ranking</h1>
        <div className="ranking-medal">
          <div className="medals">
            <img src={ gold } alt="Medalha" className="medal" />
            <img src={ silver } alt="Medalha" className="medal" />
            <img src={ bronze } alt="Medalha" className="medal" />
          </div>
          <RankingList />
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          className="btn-go-home"
          onClick={ this.changeRoute }
        >
          Jogar Novamente
        </button>
        { redirect && (<Redirect to="/" />) }
      </div>
    );
  }
}
