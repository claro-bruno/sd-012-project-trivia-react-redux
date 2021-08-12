import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress, withStyles } from '@material-ui/core';
import Header from '../Components/Header';
import { fetchQuestions, resetScore } from '../redux/actions';
import Question from '../Components/Question';
// import Score from '../Components/Score';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

class Game extends Component {
  componentDidMount() {
    const { token, dispatchFetchQuestions, dispatchResetScore } = this.props;
    dispatchResetScore();
    dispatchFetchQuestions(token);
  }

  render() {
    const {
      isFetchingQuestions,
      questions,
      currentQuestion,
      history,
      classes,
    } = this.props;

    return (
      <>
        <Backdrop className={ classes.backdrop } open={ isFetchingQuestions }>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Header />
        {/* <Score dataTestId="header-score" /> */}
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
  dispatchResetScore: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  classes: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.game.questions,
  isFetchingQuestions: state.game.isFetchingQuestions,
  currentQuestion: state.game.currentQuestion,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchQuestions: (token) => dispatch(fetchQuestions(token)),
  dispatchResetScore: () => dispatch(resetScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: false })(Game),
);
