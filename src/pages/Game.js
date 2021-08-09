import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchQuestions } from '../redux/actions';
import Question from '../Components/Question';
import Score from '../Components/Score';

class Game extends Component {
  componentDidMount() {
    const { token, dispatchFetchQuestions } = this.props;
    dispatchFetchQuestions(token);
  }

  render() {
    const { isFetchingQuestions, questions, currentQuestion, history } = this.props;

    if (isFetchingQuestions) { return <h1> Loading.... </h1>; }

    return (
      <>
        <Header />
        <Score dataTestId="header-score" />
        { questions
          .map((question, index) => (
            index === currentQuestion
              && (
                <Question
                  key={ index }
                  question={ question }
                  history={ history }
                />
              )
          ))}
      </>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  isFetchingQuestions: PropTypes.bool.isRequired,
  dispatchFetchQuestions: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.game.questions,
  isFetchingQuestions: state.game.isFetchingQuestions,
  currentQuestion: state.game.currentQuestion,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
