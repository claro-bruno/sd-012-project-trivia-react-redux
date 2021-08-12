import React from 'react';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    const newLocalStorage = localStorage.getItem('ranking');
    const getNewLocalStorage = JSON.parse(newLocalStorage);
    console.log(getNewLocalStorage);
    return (
      <>
        <Header />
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <ol>
          {getNewLocalStorage.sort((a, b) => b.score - a.score).map((element, index) => (
            <li key={ index }>
              <div>
                <img
                  src={ `https://www.gravatar.com/avatar/${element.picture}` }
                  alt="imagem-do-gravatar"
                  data-testid="header-profile-picture"
                />
              </div>
              <p data-testid={ `player-name-${index}` }>
                {element.name}
              </p>
              <p data-testid={ `player-score-${index}` }>
                {element.score}
              </p>
            </li>
          ))}
        </ol>
      </>
    );
  }
}

export default Ranking;
