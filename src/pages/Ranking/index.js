import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PlayerRankingS, RankingHeaderS } from './styles';
import ButtonS from '../../styles/buttonStyle';

class Ranking extends Component {
  render() {
    const savedRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = !savedRanking ? [] : savedRanking;
    ranking.sort((a, b) => b.score - a.score);
    return (
      <main>
        <RankingHeaderS>
          <h2 data-testid="ranking-title">Ranking</h2>
        </RankingHeaderS>
        <PlayerRankingS>
          {
            ranking.map(({ picture, name, score }, index) => (
              <div key={ score * Math.random() }>
                <img
                  src={ `https://www.gravatar.com/avatar/${picture}` }
                  alt="img-user"
                />
                <h4>
                  <span data-testid={ `player-name-${index}` }>{ name }</span>
                </h4>
                <section>
                  <h4>
                    <span data-testid={ `player-score-${index}` }>{ score }</span>
                  </h4>
                </section>
              </div>
            ))
          }

          <Link to="/">
            <ButtonS
              type="button"
              data-testid="btn-go-home"
            >
              Home
            </ButtonS>
          </Link>
        </PlayerRankingS>
      </main>
    );
  }
}

export default Ranking;
