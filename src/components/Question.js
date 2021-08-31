import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';
import TrueOrFalse from './TrueOrFalse';
import MultipleChoice from './MultipleChoice';
import Time from './Time';

const baseScore = 10;

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disableButtons: false,
      question: null,
    };

    this.toggleDisableButtons = this.toggleDisableButtons.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  shouldComponentUpdate({ isLoading, questions }, { question }) {
    if (!isLoading && !question) {
      this.setQuestion(questions[0]);
      return false;
    }
    return true;
  }

  setQuestion(question) {
    this.setState({
      question,
    });
  }

  setScore() {
    const { question } = this.state;
    const { timer } = this.props;

    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const stateObj = JSON.parse(localStorage.getItem('state'));

    stateObj.player.score += baseScore + (timer * difficultyScore[question.difficulty]);
    stateObj.player.assertions += 1;

    localStorage.setItem('state', JSON.stringify(stateObj));
  }

  toggleDisableButtons() {
    this.setState((previousState) => ({
      disableButtons: !previousState.disableButtons,
    }));
  }

  render() {
    const { isLoading, error } = this.props;
    const { question, disableButtons } = this.state;

    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
      <section>
        <section>
          <p
            data-testid="question-category"
          >
            { question.category }
          </p>
          <p
            data-testid="question-text"
          >
            { question.question }
          </p>
        </section>
        <section>
          {
            question.type === 'boolean'
              ? (
                <TrueOrFalse
                  question={ question }
                  setScore={ this.setScore }
                  disabled={ disableButtons }
                />
              )
              : (
                <MultipleChoice
                  question={ question }
                  setScore={ this.setScore }
                  disabled={ disableButtons }
                />
              )
          }
        </section>
        <Time toggleDisableButtons={ this.toggleDisableButtons } />
      </section>
    );
  }
}

const mapStateToProps = ({ gameReducer: { questions, timer, isLoading, error } }) => ({
  questions,
  timer,
  isLoading,
  error,
});

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(QuestionCard);
