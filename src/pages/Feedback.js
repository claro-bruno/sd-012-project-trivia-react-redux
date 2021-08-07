import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Performance from '../components/Performance';
import { updateGlobalKey } from '../redux/actions/questions';
import { resetGame } from '../redux/actions/nextQuestion';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldRedirectLogin: false,
      shouldRedirectRanking: false,
    };

    this.rankingUpdate = this.rankingUpdate.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
    this.redirectRanking = this.redirectRanking.bind(this);
  }

  componentDidMount() {
    this.rankingUpdate();
  }

  rankingUpdate() {
    const { name, score, picture } = this.props;
    const rankingSaved = JSON.parse(localStorage.getItem('ranking'));

    let ranking = [];
    if (rankingSaved) {
      ranking = [
        ...rankingSaved,
        { name, score, picture },
      ];
    } else {
      ranking = [{ name, score, picture }];
    }
    ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  redirectLogin() {
    const { changeGlobal, setResetGame } = this.props;
    changeGlobal(false);
    setResetGame();
    this.setState({ shouldRedirectLogin: true });
  }

  redirectRanking() {
    this.setState({ shouldRedirectRanking: true });
  }

  render() {
    const { shouldRedirectLogin, shouldRedirectRanking } = this.state;
    if (shouldRedirectLogin) return <Redirect to="/" />;
    if (shouldRedirectRanking) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">Feedback Bonito</h1>
        <Performance />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.questions.score,
  picture: state.login.picture,
});

const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (status) => dispatch(updateGlobalKey(status)),
  setResetGame: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  changeGlobal: PropTypes.func.isRequired,
  setResetGame: PropTypes.func.isRequired,
};
