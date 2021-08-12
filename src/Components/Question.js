import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { AllHtmlEntities } from 'html-entities';
import { shuffle, difficultyToPoints } from '../data/helpers';
import { updateScore } from '../redux/actions';
import Stopwatch from './Stopwatch';
import NextButton from './NextButton';
import '../App.css';

const styles = (theme) => ({
  root: {
    display: 'flex', flexFlow: 'column', alignItems: 'center',
  },
  card: {
    minWidth: '200px', maxWidth: '700px', width: '70%',
  },
  question: {
    color: theme.palette.grey.A400,
  },
  buttonsContainer: {
    width: '100%',
    'align-items': 'stretch',
    'align-content': 'stretch',
    // oi: console.log(theme),
  },
  buttons: {
    display: 'flex',
  },
  nextButton: {
    '&.MuiButtonGroup-groupedVertical:not(:first-child)': {
      color: theme.palette.grey['300'],
      backgroundColor: theme.palette.info.main,
    },
  },
  correctButton: {
    backgroundColor: theme.palette.info.main,
    '&.MuiButtonGroup-groupedContainedVertical:not(:last-child)': {
      borderBottom: theme.palette.info.main,
    },
    '&.MuiButtonGroup-groupedContainedVertical:not(:last-child).Mui-disabled': {
      backgroundColor: 'rgba(118, 255, 3, 0.5)',
      color: '#2E7D32',
      border: '3px solid rgb(6, 240, 15)',
    },
  },
  incorrectButton: {
    backgroundColor: theme.palette.info.main,
    '&.MuiButtonGroup-groupedContainedVertical:not(:last-child)': {
      borderBottom: theme.palette.info.main,
    },
    '&.MuiButtonGroup-groupedContainedVertical:not(:last-child).Mui-disabled': {
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
      border: '3px solid rgb(255, 0, 0)',
      color: '#B71C1C',
      borderBottom: '0px',
    },
  },
  stopwatch: {
    color: theme.palette.info.main,
  },
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.state = {
      answers: shuffle([
        { correctAnswer: props.question.correct_answer },
        ...props.question.incorrect_answers]),
    };
    this.isNotAnswering = this.isNotAnswering.bind(this);
  }

  componentDidMount() {
    const { dispatchUpdateScore } = this.props;
    dispatchUpdateScore();
  }

  handleAnswer(isCorrect) {
    const {
      question,
      dispatchUpdateScore,
      stopTimer,
      remainingTime,
    } = this.props;
    stopTimer();
    dispatchUpdateScore(
      remainingTime, difficultyToPoints(question.difficulty), isCorrect,
    );
  }

  isNotAnswering() {
    const { isOutOfTime, isQuestionAnswered } = this.props;
    return isOutOfTime || isQuestionAnswered;
  }

  render() {
    const { answers } = this.state;
    const {
      question,
      history,
      classes,
    } = this.props;
    return (
      <div className={ classes.root }>
        <CardContent>
          <Stopwatch className={ classes.stopwatch } />
        </CardContent>
        <Card className={ classes.card }>
          <CardContent>
            <Typography
              className={ classes.question }
              variant="h5"
              component="h2"
            >
              {AllHtmlEntities.decode(question.question)}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {question.category}
            </Typography>
          </CardContent>
          <CardActions className={ classes.buttons }>
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
              className={ classes.buttonsContainer }
            >
              {answers.map((answer, index) => (
                (answer.correctAnswer)
                  ? (
                    <Button
                      data-testid="correct-answer"
                      key={ answer.correctAnswer }
                      onClick={ () => this.handleAnswer(true) }
                      disabled={ this.isNotAnswering() }
                      className={ classes.correctButton }
                    >
                      {answer.correctAnswer}
                    </Button>
                  )
                  : (
                    <Button
                      data-testid={ `wrong-answer-${index}` }
                      key={ answer }
                      onClick={ () => this.handleAnswer(false) }
                      disabled={ this.isNotAnswering() }
                      className={ classes.incorrectButton }
                    >
                      {answer}
                    </Button>
                  )
              ))}
              <NextButton history={ history } className={ classes.nextButton } />
            </ButtonGroup>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  remainingTime: state.timer.remainingTime,
  stopTimer: state.timer.stopTimerCallback,
  isOutOfTime: state.timer.isOutOfTime,
  isQuestionAnswered: state.timer.isQuestionAnswered,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateScore: (timer, difficulty, isCorrect) => dispatch(
    updateScore(timer, difficulty, isCorrect),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: false })(Question),
);

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  question: PropTypes.shape().isRequired,
  dispatchUpdateScore: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  isOutOfTime: PropTypes.bool.isRequired,
  isQuestionAnswered: PropTypes.bool.isRequired,
  remainingTime: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    buttons: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    stopwatch: PropTypes.shape().isRequired,
    buttonsContainer: PropTypes.shape().isRequired,
    correctButton: PropTypes.shape().isRequired,
    incorrectButton: PropTypes.shape().isRequired,
    nextButton: PropTypes.shape().isRequired,
    root: PropTypes.shape().isRequired,
    card: PropTypes.shape().isRequired,
  }).isRequired,
};
