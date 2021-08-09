import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateGlobalKey } from '../redux/actions/questions';
import { resetGame } from '../redux/actions/nextQuestion';
import '../styles/ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirectLogin: false,
    };

    this.getRanking = this.getRanking.bind(this);
    this.dataPlayer = this.dataPlayer.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
  }

  getRanking() {
    return JSON.parse(localStorage.getItem('ranking'));
  }

  dataPlayer(player, index) {
    return (
      <li key={ index }>
        <div className="li-div">
          <span data-testid={ `player-score-${index}` }>{ player.score }</span>
          <div className="ranking-li">
            <span data-testid={ `player-name-${index}` }>{ player.name }</span>
            <img className="profile-pic" src={ player.picture } alt={ player.name } />
          </div>
        </div>
      </li>
    );
  }

  redirectLogin() {
    const { changeGlobal, setResetGame } = this.props;
    changeGlobal(false);
    setResetGame();
    this.setState({ shouldRedirectLogin: true });
  }

  render() {
    const { shouldRedirectLogin } = this.state;
    const ranking = this.getRanking();
    if (shouldRedirectLogin) return <Redirect to="/" />;
    return (
      <div className="ranking-screen">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => this.dataPlayer(player, index)) }
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectLogin }
          className="feedback-button"
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
  setResetGame: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  changeGlobal: PropTypes.func.isRequired,
  setResetGame: PropTypes.func.isRequired,
};
