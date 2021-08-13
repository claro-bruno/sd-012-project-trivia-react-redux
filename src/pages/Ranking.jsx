import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const newLocalStorage = localStorage.getItem('ranking');
    const getNewLocalStorage = JSON.parse(newLocalStorage);
    return (
      <>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <ol>
          {getNewLocalStorage.sort((a, b) => b.score - a.score).map((element, index) => {
            console.log(element);
            console.log(index);
            return (
              <li key={ index }>
                <div>
                  <img
                    src={ `${element.picture}` }
                    alt="imagem-do-gravatar"
                    data-testid="header-profile-picture"
                  />
                </div>
                <span data-testid={ `player-name-${index}` }>
                  {element.name}
                </span>
                <span data-testid={ `player-score-${index}` }>
                  {element.score}
                </span>
              </li>
            );
          })}
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Go Home
          </button>
        </Link>

      </>
    );
  }
}

export default Ranking;
