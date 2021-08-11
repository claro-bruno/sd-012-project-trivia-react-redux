import React from 'react';
import { Link } from 'react-router-dom';
import {
  RankingWrapper, PlayerWrapper, PlayerContainer,
  ScoreWrapper, RankingTitle, TipsContainer,
} from './styles';
import { Button } from '../globalStyles';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>
        <RankingTitle data-testid="ranking-title">Ranking</RankingTitle>
        <Link to="/" style={ { textDecoration: 'none' } }>
          <Button
            data-testid="btn-go-home"
            type="button"
            style={ { width: '100%', padding: '0.5vw' } }
          >
            Jogar novamente
          </Button>
        </Link>
        <PlayerContainer>
          <TipsContainer>
            <span>Jogadores</span>
            <span>Pontos</span>
          </TipsContainer>
          {
            ranking.map((player, index) => (
              <RankingWrapper key={ index }>
                <PlayerWrapper>
                  <img
                    src={ player.picture }
                    style={ { borderRadius: '50%' } }
                    alt={ player.name }
                  />
                  <span data-testid={ `player-name-${index}` }>{ player.name }</span>
                </PlayerWrapper>
                <ScoreWrapper>
                  <span data-testid={ `palyer-score${index}` }>{player.score}</span>
                </ScoreWrapper>
              </RankingWrapper>
            ))
          }
        </PlayerContainer>

      </>
    );
  }
}

export default Ranking;
