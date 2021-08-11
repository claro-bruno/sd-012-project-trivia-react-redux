import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';

class Ranking extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      redirect: false,
    };
  }

  handleClick() {
    this.setState((state) => ({
      ...state,
      redirect: true,
    }));
  }

  render() {
    const {
      state: { redirect },
      handleClick,
    } = this;

    const state = JSON.parse(localStorage.getItem('ranking'));

    const stateSort = state.sort((a, b) => b.score - a.score);

    return (
      <>
        { redirect && <Redirect to="/" /> }
        <h2 data-testid="ranking-title">Ranking</h2>
        <Button
          name="HOME"
          testId="btn-go-home"
          handleClick={ handleClick }
        />
        <ol>
          {
            stateSort.map((posicao, index) => {
              const { name, score, picture } = posicao;
              return (
                <li key={ `${score}.${name}.${picture}` }>
                  <img src={ picture } alt={ `Player avatar ${index}` } />
                  <h3 data-testid={ `player-name-${index}` }>
                    { name }
                  </h3>
                  <h4 data-testid={ `player-score-${index}` }>
                    { score }
                  </h4>
                </li>
              );
            })
          }
        </ol>
      </>
    );
  }
}

export default Ranking;
