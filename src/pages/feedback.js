import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Performance from '../components/Performance';
import { updateGlobalKey } from '../redux/actions/questions';
import { resetGame } from '../redux/actions/nextQuestion';
import '../styles/feedback.css';
import brain from '../images/brain.png';
import sadBrain from '../images/brain-sad.png';

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
    this.brainReturn = this.brainReturn.bind(this);
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

  brainReturn() {
    const { assertions } = this.props;
    const tres = 3;
    if (assertions < tres) return sadBrain;
    return brain;
  }

  render() {
    const { shouldRedirectLogin, shouldRedirectRanking } = this.state;
    if (shouldRedirectLogin) return <Redirect to="/" />;
    if (shouldRedirectRanking) return <Redirect to="/ranking" />;
    return (
      <div className="feedback-background">
        <Header />
        <div className="feedback-screen">
          <div className="feedback-box">
            <img
              data-testid="feedback-text"
              className="brain"
              src={ this.brainReturn() }
              alt="brain"
            />
            <Performance />
            <span className="feedback-buttons">
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ this.redirectLogin }
                className="feedback-button"
              >
                Play Again
              </button>
              <button
                type="button"
                data-testid="btn-ranking"
                onClick={ this.redirectRanking }
                className="feedback-button"
              >
                Ranking
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.questions.score,
  picture: state.login.picture,
  assertions: state.questions.assertions,
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
  assertions: PropTypes.number.isRequired,
};
