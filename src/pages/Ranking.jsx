import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = this.userRanking();
    const sort = ({ score: firstPlace },
      { score: secondPlace }) => firstPlace > secondPlace;
    const order = ranking.sort(sort);
    this.setState({ ranking: order });
  }

  userRanking() {
    const json = localStorage.getItem('ranking');
    const ranking = JSON.parse(json);
    if (!ranking) return [];
    return ranking;
  }

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <span data-testid="ranking-title">Ranking</span>
        <ul>
          {ranking
            .sort((a, b) => (b.score - a.score))
            .map(({ name, score, picture }, key) => (
              <li key={ key }>
                <img src={ picture } alt="avatar" />
                <span data-testid={ `player-name-${key}` }>{name}</span>
                <span data-testid={ `player-score-${key}` }>{score}</span>
              </li>
            ))}
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Return
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
