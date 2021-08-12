import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import TriviaHeader from '../components/TriviaHeader';
import { updateQuestion, getTriviaQuestions } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { updateQuestion: setQuestion } = this.props;
    setQuestion({ question: { qnNum: 0, answered: false } });
    this.setScoreAndAssertions();
    this.makeRank();
  }

  componentWillUnmount() {
    localStorage.removeItem('state');
  }

  setScoreAndAssertions() {
    const { getTriviaQuestions: resetQuestions } = this.props;
    resetQuestions([]);
  }

  makeRank() {
    const { user: { name, picture }, trivia: { score } } = this.props;
    let rankList = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking')) : [];
    const newPlayer = { name, score, picture };
    rankList = [...rankList, newPlayer]
      .sort(({ score: scA }, { score: scB }) => scB - scA);
    localStorage.setItem('ranking', JSON.stringify(rankList));
  }

  renderFeedbackMessage() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const hit = 3;
    if (assertions >= hit) {
      return (
        <>
          <h3 data-testid="feedback-text" className="hidden">Mandou bem!</h3>
          <h3>Well done!</h3>
        </>
      );
    }
    return (
      <>
        <h3 data-testid="feedback-text" className="hidden">Podia ser melhor...</h3>
        <h3>You can do better...</h3>
      </>
    );
  }

  render() {
    const { player: { score, assertions } } = JSON.parse(localStorage.getItem('state'));
    return (
      <>
        <TriviaHeader />
        <section className="feedback-container">
          {this.renderFeedbackMessage()}
          <p>
            You were right in
            <span data-testid="feedback-total-question">{ ` ${assertions} ` }</span>
            { assertions !== 1 ? 'questions,' : 'question,' }
          </p>
          <p>
            scoring a total of
            <span data-testid="feedback-total-score">{ ` ${score} ` }</span>
            points!
          </p>
          <div id="buttonHome">
            <Button
              testId="btn-play-again"
              text="PLAY AGAIN"
              linkTo="/"
              className="btn-feedback"
            />
          </div>
          <div id="buttonRanking">
            <Button
              testId="btn-ranking"
              text="RANKING"
              linkTo="/ranking"
              className="btn-feedback"
            />
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  trivia: state.trivia,
});

const mapDispatchToProps = ({ updateQuestion, getTriviaQuestions });

Feedback.propTypes = {
  updateQuestion: PropTypes.func.isRequired,
  getTriviaQuestions: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  trivia: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
