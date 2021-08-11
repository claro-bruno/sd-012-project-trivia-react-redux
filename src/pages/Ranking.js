import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handleRanking = this.handleRanking.bind(this);
    this.rankingBtn = this.rankingBtn.bind(this);
  }

  rankingBtn() {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking() {
    const { hash } = this.props;
    const list = JSON.parse(localStorage.getItem('state'));
    // const hashList = localStorage.getItem('hash');
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const player = {
      image: hash,
      name: list.player.name,
      score: list.player.score,
    };
    ranking.push(player);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    this.handleRanking();
    const { history } = this.props;
    const infos = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="container-ranking">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        <hr />
        <ul className="container-list">
          { infos.sort((a, b) => b.score - a.score).map((data, index) => (
            <>
              <li key={ index }>
                <img className="logoAvatar" src={ `https://www.gravatar.com/avatar/${data.image}` } alt="Imagem Gravatar" />
                <p data-testid={ `player-name-${index}` }>{ data.name }</p>
                <p data-testid={ `player-score-${index}` }>{ data.score }</p>
              </li>
              <hr />
            </>
          )) }
        </ul>
        <button
          className="feedback-btn"
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  hash: state.hashReducer.hash,
});

export default connect(mapStateToProps)(Ranking);

Ranking.propTypes = {
  history: PropTypes.objectOf('string').isRequired,
  hash: PropTypes.string.isRequired,
};
