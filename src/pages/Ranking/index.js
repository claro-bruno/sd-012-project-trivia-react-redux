import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RankinMainS, PlayerRankingS, RankingHeaderS } from './styles';
import ButtonS from '../../styles/buttonStyle';

import resetData from '../../Redux/reducers/player/actions/resetData';
import resetConfig from '../../Redux/reducers/questions/actions/resetConfig';

class Ranking extends Component {
  render() {
    const { resetPlayer, resetSettings } = this.props;

    const savedRanking = JSON.parse(localStorage.getItem('ranking'));
    const ranking = !savedRanking ? [] : savedRanking;
    ranking.sort((a, b) => b.score - a.score);
    return (
      <RankinMainS>
        <RankingHeaderS>
          <h2 data-testid="ranking-title">Ranking</h2>
        </RankingHeaderS>
        <PlayerRankingS>
          <div>
            <h2>Jogador</h2>
            <h2>Pontuação</h2>
          </div>
          {
            ranking.map(({ picture, name, score }, index) => (
              <div key={ score * Math.random() }>
                <section>
                  <img
                    src={ `https://www.gravatar.com/avatar/${picture}` }
                    alt="img-user"
                  />
                  <h4>
                    <span data-testid={ `player-name-${index}` }>{ name }</span>
                  </h4>
                </section>
                <h4>
                  <span data-testid={ `player-score-${index}` }>{ score }</span>
                </h4>
              </div>
            ))
          }

          <Link to="/" onClick={ () => { resetPlayer(); resetSettings(); } }>
            <ButtonS
              type="button"
              data-testid="btn-go-home"
            >
              Home
            </ButtonS>
          </Link>
        </PlayerRankingS>
      </RankinMainS>
    );
  }
}

Ranking.propTypes = {
  resetPlayer: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetPlayer: () => dispatch(resetData()),
  resetSettings: () => dispatch(resetConfig()),
});

export default connect(null, mapDispatchToProps)(Ranking);
