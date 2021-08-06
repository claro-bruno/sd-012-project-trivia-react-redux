import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Performance from '../components/Performance';

class Config extends React.Component {
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

  rankingUpdate() {
    const rankingSaved = JSON.parse(localStorage.getItem('ranking'));
    const { name, score, picture } = this.props;
    let ranking = [];
    if (rankingSaved) {
      ranking = [
        ...rankingSaved,
        { name, score, picture },
      ];
    } else {
      ranking = [{ name, score, picture }];
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  redirectLogin() {
    this.setState({ shouldRedirectLogin: true });
  }

  redirectRanking() {
    this.setState({ shouldRedirectRanking: true });
  }

  render() {
    this.rankingUpdate();
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

export default connect(mapStateToProps)(Config);

Config.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};
