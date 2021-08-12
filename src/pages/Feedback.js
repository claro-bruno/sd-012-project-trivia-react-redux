import React, { Component } from 'react';
import { arrayOf, objectOf, number, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Feed, Hits, TotalScore } from '../components/Feedback';
import { PlayerImg, PlayerName, Score } from '../components/Header';
import { setReset } from '../actions';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    const { reset, history } = this.props;
    reset();
    history.push('/');
  }

  render() {
    const { getQuestions, getAssertions, getScore } = this.props;
    const assertions = getAssertions;
    const totalScore = getScore;
    const qntQuestions = getQuestions.length;
    return (
      <div
        className="feedback-container"
      >
        <header>
          <div
            className="feedback"
          >
            <h1>Feedback</h1>
          </div>
          <PlayerImg />
          <div className="player-name-feedback">
            <PlayerName />
          </div>
          <div
            className="feedback-score"
          >
            <Score />
          </div>
        </header>
        <main>
          <Feed
            assertions={ assertions }
          />
          <TotalScore
            totalScore={ totalScore }
          />
          <Hits
            assertions={ assertions }
            qntQuestions={ qntQuestions }
          />
          <Button
            onClick={ this.goHome }
            testId="btn-play-again"
            label="Jogar novamente"
          />
          <Button
            link="/ranking"
            testId="btn-ranking"
            label="Ver Ranking"
          />
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  getQuestions: questions.questions,
  answered: questions.answered,
  getScore: questions.score,
  getAssertions: questions.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(setReset()),
});

Feedback.propTypes = {
  getQuestions: arrayOf(objectOf).isRequired,
  getScore: number.isRequired,
  getAssertions: number.isRequired,
  history: shape({
    push: func,
  }).isRequired,
  reset: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
