import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import NextButton from './nextButton';
import { submitScore } from '../../redux/actions/submitScoreAction';
import {
  QuestionWrapper,
  GameWrapper, Cat, Quest, Tip, AnswerWrapper, AsButton, Timer,
} from './styles';

class QuestionLayout extends React.Component {
  constructor() {
    super();
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      correct: '',
      wrong: '',
      question: 0,
      hidden: true,
      showNextButton: false,
      timeCount: 30,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.timeCounter = this.timeCounter.bind(this);
    this.handleDisableButtons = this.handleDisableButtons.bind(this);
  }

  // faz o contador de 30 sec começar somente após a montagem:
  componentDidMount() {
    this.timeCounter();
  }

  // não deixa o contador baixar de zero:
  shouldComponentUpdate(nextProps, nextState) {
    const { timeCount } = this.state;
    nextState = 0;
    return (timeCount > nextState);
  }

  // reseta o temporizador na desmontagem da página:
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  // função que deve setar o contador de 30 segundos para responder a pergunta:
  timeCounter() {
    const intervalTimer = 1000;
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        timeCount: prevState.timeCount - 1,
      }));
    }, intervalTimer);
  }

  // deve desabilitar ou não os botões de resposta:
  handleDisableButtons() {
    const { showNextButton } = this.state;
    if (showNextButton) {
      return true;
    }
    return false;
  }

  scoreCalculation() {
    const { questions } = this.props;
    const { timeCount, question } = this.state;

    const { difficulty } = questions[question];
    const defaultNum = 10;
    const weights = { hard: 3, medium: 2, easy: 1 };

    const score = (defaultNum + (timeCount * weights[difficulty]));
    return score;
  }

  checkAnswer({ target }) {
    clearInterval(this.myInterval);
    const { setScore } = this.props;

    if (target.id) {
      const { player } = JSON.parse(localStorage.getItem('state'));
      player.score += this.scoreCalculation();
      player.assertions += 1;
      localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
      setScore(player);
    }

    this.setState({
      correct: 'correct',
      wrong: 'wrong',
      hidden: false,
      timeCount: 30,
    });
  }

  storeInTheRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { player: { name, score, gravatarEmail } } = JSON
      .parse(localStorage.getItem('state'));
    const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    if (ranking) {
      localStorage.setItem('ranking', JSON
        .stringify([...ranking, { name, score, picture }]
          .sort((a, b) => b.score - a.score)));
    } else {
      localStorage.setItem('ranking', JSON
        .stringify([{ name, score, picture }]));
    }
  }

  handleClick() {
    this.setState((state) => ({
      ...state,
      question: state.question + 1,
      hidden: true,
      correct: '',
      wrong: '',
    }), () => this.timeCounter());
  }

  render() {
    const { correct, wrong, hidden, question, timeCount } = this.state;
    const { questions } = this.props;
    if (questions[question] === undefined) {
      this.storeInTheRanking();
      return <Redirect to="/feedback" />;
    }
    return (
      <GameWrapper>
        <QuestionWrapper>
          <Cat data-testid="question-category">{questions[question].category}</Cat>
          <Quest data-testid="question-text">{questions[question].question}</Quest>
          <Tip>Fácil</Tip>
        </QuestionWrapper>
        <AnswerWrapper>
          <Timer>{timeCount}</Timer>
          <AsButton
            className={ correct }
            type="button"
            id="correct"
            data-testid="correct-answer"
            onClick={ this.checkAnswer }
            disabled={ timeCount === 0 || this.handleDisableButtons() }
          >
            {questions[question].correct_answer}

          </AsButton>
          {
            questions[question].incorrect_answers
              .map((e, index) => (
                <AsButton
                  className={ wrong }
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  key={ e }
                  onClick={ this.checkAnswer }
                  disabled={ timeCount === 0 || this.handleDisableButtons() }
                >
                  {e}
                </AsButton>))
          }
          <NextButton
            onClick={ this.handleClick }
            hidden={ hidden }
          />
        </AnswerWrapper>
      </GameWrapper>
    );
  }
}

QuestionLayout.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  setScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setScore: ({ score, assertions }) => dispatch(submitScore(score, assertions)),
});

export default connect(null, mapDispatchToProps)(QuestionLayout);
