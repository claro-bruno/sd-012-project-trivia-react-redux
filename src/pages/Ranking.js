import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateGlobalKey } from '../redux/actions/questions';
import { resetQuestions } from '../redux/actions/nextQuestion';

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
        <img src={ player.picture } alt={ player.name } />
        <span data-testid={ `player-name-${index}` }>{ player.name }</span>
        <span data-testid={ `player-score-${index}` }>{ player.score }</span>
      </li>
    );
  }

  redirectLogin() {
    const { changeGlobal, setResetQuestions } = this.props;
    changeGlobal(false);
    setResetQuestions();
    this.setState({ shouldRedirectLogin: true });
  }

  render() {
    const { shouldRedirectLogin } = this.state;
    const ranking = this.getRanking();
    if (shouldRedirectLogin) return <Redirect to="/" />;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => this.dataPlayer(player, index)) }
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectLogin }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
  setResetQuestions: () => dispatch(resetQuestions()),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  changeGlobal: PropTypes.func.isRequired,
  setResetQuestions: PropTypes.func.isRequired,
};
