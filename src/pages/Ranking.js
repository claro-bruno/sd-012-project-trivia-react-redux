import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Ranking.css';
import primeiroLugar from '../images/first-place.png';
import segundoLugar from '../images/second-place.png';
import terceiroLugar from '../images/third-place.png';

class Ranking extends React.Component {
  constructor() {
    super();
    this.scoreBoard = this.scoreBoard.bind(this);
    this.noStorageData = this.noStorageData.bind(this);
    this.prizeGenerator = this.prizeGenerator.bind(this);
    this.prizeImage = this.prizeImage.bind(this);
  }

  prizeGenerator(index) {
    if (index === 0) {
      return primeiroLugar;
    } if (index === 1) {
      return segundoLugar;
    } if (index === 2) {
      return terceiroLugar;
    }
  }

  prizeImage(index) {
    return <img src={ this.prizeGenerator(index) } alt="Foto-trofeu" />;
  }

  scoreBoard() {
    const localStorageData = JSON.parse(localStorage.getItem('ranking'));
    const THREE = 3;
    return (
      <div className="w-1/2 text-xl">
        {localStorageData && localStorageData
          .sort((a, b) => b.score - a.score)
          .map((eachPlayer, index) => (
            <ul
              className="flex items-center justify-evenly black-border
              m-1 shadow-lg rounded-xl blue-background"
              key={ index }
            >
              {/* trophy image credits to Freepik from flaticons
              and medals images credits to Flaticons from flaticons */}
              <li>
                {index < THREE ? this.prizeImage(index) : `${index + 1}º`}
                {/* <img
                  src={ index < THREE ? this.prizeGenerator(index) : index + 1 }
                  alt=""
                /> */}
              </li>
              <li>
                <img
                  src={ `${eachPlayer.picture}` }
                  alt="Foto-player"
                  className="rounded-2xl my-2"
                />
              </li>
              <li data-testid={ `player-name-${index}` }>{eachPlayer.name}</li>
              <li data-testid={ `player-score-${index}` }>
                {eachPlayer.score}
                pts
              </li>
            </ul>
          ))}
      </div>);
  }

  noStorageData() {
    return <span>Sem pontuações no momento.</span>;
  }

  render() {
    const localStorageData = JSON.parse(localStorage.getItem('ranking'));

    // Colocando o elemento do ranking em uma variável pra usar renderização condicional.
    // Caso o localStorageData não tenha nenhum dado, ele recebe null então retorna um erro ao fazer o map

    return (
      <>
        <Header />
        <div className="flex flex-col items-center">
          <h1 data-testid="ranking-title" className="text-5xl mb-6 mt-12">Ranking</h1>
          {localStorageData ? this.scoreBoard() : this.noStorageData()}
          <Link className="ranking-button-container" to="/">
            <button data-testid="btn-go-home" className="ranking-button" type="button">
              Página de Login
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Ranking;
