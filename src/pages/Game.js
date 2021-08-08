import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchQuestions } from '../redux/actions';
import Question from '../Components/Question';

class Game extends Component {
  componentDidMount() {
    const { token, dispatchFetchQuestions } = this.props;
    dispatchFetchQuestions(token);
  }

  render() {
    const { isFetchingQuestions, questions, currentQuestion } = this.props;

    if (isFetchingQuestions) { return <h1> Loading.... </h1>; }

    return (
      <>
        <Header />
        { questions
          .map((question, index) => (
            index === currentQuestion
              && (
                <Question
                  key={ index }
                  question={ question }
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
