import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ReplayIcon from '@material-ui/icons/Replay';
import Header from '../components/Header';
import Results from '../components/Results';
import './Feedback.css';

class Feedback extends React.Component {
  constructor() {
    super();

    const pullScore = localStorage.getItem('state');
    const finalScore = JSON.parse(pullScore).player.score;
    const { assertions } = JSON.parse(pullScore).player;
    this.state = {
      score: finalScore,
      assertions,
      message: '',
      redirectLogin: false,
      redirectRanking: false,
    };
    this.setMessage = this.setMessage.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
    this.redirectRanking = this.redirectRanking.bind(this);
  }

  componentDidMount() {
    this.setMessage();
  }

  setMessage() {
    const { assertions } = this.state;
    const minAssertions = 3;
    if (assertions < minAssertions) {
      this.setState({
        message: 'Podia ser melhor...',
      });
    } else {
      this.setState({
        message: 'Mandou bem!',
      });
    }
  }

  redirectLogin() {
    this.setState({ redirectLogin: true });
  }

  redirectRanking() {
    this.setState({ redirectRanking: true });
  }

  render() {
    const { score, message, redirectLogin, redirectRanking } = this.state;
    if (redirectRanking) {
      return <Redirect to="/ranking" />;
    }
    if (redirectLogin) {
      return <Redirect to="/" />;
    }
    return (
      <section className="feedback-content">
        <Results />
        <Header score={ score } />
        <p data-testid="feedback-text">{message || 'Loading'}</p>
        <div className="button-play-again">
          <Button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectLogin }
            variant="contained"
            color="primary"
          >
            <ReplayIcon />
            Jogar Novamente
          </Button>
        </div>
        <div className="button-ranking">
          <Button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.redirectRanking }
            variant="contained"
            color="secondary"
          >
            <FormatListNumberedIcon />
            Ver Ranking
          </Button>
        </div>
      </section>
    );
  }
}

export default Feedback;
