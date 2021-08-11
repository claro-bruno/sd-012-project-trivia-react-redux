import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Game.css';
// import NextButton from '../components/NextButton';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 30,
      disabled: false,
      score: 0,
      assertions: 0,
      // questionNumber: 0,
    };

    this.renderQuestions = this.renderQuestions.bind(this);
    this.setCounter = this.setCounter.bind(this);
    this.scoreCounter = this.scoreCounter.bind(this);
    this.assertionsCounter = this.assertionsCounter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    // this.fiveQuestions = this.fiveQuestions.bind(this);
    // this.handleClickNextButton = this.handleClickNextButton(this);
  }

  // Requisito 8 - para fazer foi consultado essa vídeo-aula: https://www.youtube.com/watch?v=NAx76xx40jM

  componentDidMount() {
    this.setCounter();
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.myInterval);
    }
    this.setLocalStorageGame();
  }

  setCounter() {
    const ONE_SECOND = 1000;

    this.myInterval = setInterval(() => {
      const { count } = this.state;
      if (count === 1) {
        this.setState((prevState) => ({
          count: prevState.count - 1,
          disabled: true,
        }));
      } else {
        this.setState((prevState) => ({
          count: prevState.count - 1,
        }));
      }
    }, ONE_SECOND);
  }

  setLocalStorageGame() {
    const { assertions, score } = this.state;
    const { name, gravatarEmail } = this.props;

    const objeto = JSON.stringify({ player: { name, gravatarEmail, assertions, score } });
    localStorage.setItem('state', objeto);
  }

  handleClick({ target: { value: difficulty, name } }) {
    if (name === 'correct') {
      this.scoreCounter(difficulty);
      this.assertionsCounter();
    }
    this.changeColorAnswer();
    // this.setLocalStorageGame();

    this.setState({
      disabled: true,
    });

    // this.handleClickNextButton();
  }

  scoreCounter(difficulty) {
    const { /* score, */ count } = this.state;

    const questionLevel = { hard: 3, medium: 2, easy: 1 };
    const DEFAULT_NUMBER = 10;
    const newScore = DEFAULT_NUMBER + (count * questionLevel[difficulty]);

    // return (newScore);
    this.setState((prevState) => ({
      score: prevState.score + newScore,
    }));
  }

  assertionsCounter() {
    const { assertions } = this.state;
    this.setState({
      assertions: assertions + 1,
    });
  }

  changeColorAnswer() {
    const cssValueWrong = '3px solid rgb(255, 0, 0)';
    const cssCorrectValue = '3px solid rgb(6, 240, 15)';
    document.getElementById('btn-next').style.display = 'block';
    document.getElementById('correct').style.border = cssCorrectValue;
    document.getElementById('incorrect').style.border = cssValueWrong;
  }

  // Rsacunho do Requisito 11
  // const { questionNumber } = this.state;
  // const MAX_QUESTIONS = 5;
  // if (questionNumber <= MAX_QUESTIONS) {
  //   this.setState((prevState) => ({
  //     questionNumber: prevState.questionNumber + 1,
  //   }), () => console.log(questionNumber));
  // }
  // this.setState((state) => ({
  //   ...state,

  // }));

  // fiveQuestions() {
  //   // const { triviaQuest } = this.props;
  //   // const firstQuestion = triviaQuest[0];
  //   // console.log(triviaQuest);

  // }

  // handleClickNextButton() {
  //   const { questionNumber } = this.state;

  //   const MAX_QUESTIONS = 5;
  //   if (questionNumber < MAX_QUESTIONS) {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       questionNumber: prevState.questionNumber + 1,
  //     })/* , () => console.log(questionNumber) */);
  //   }
  //   console.log(questionNumber);

  //   // this.setState((state) => ({
  //   //   ...state,
  //   //   questionNumber: state.questionNumber + 1,
  //   // }));

  //   // this.setState({
  //   //   questionNumber: questionNumber + 1,
  //   // });
  // }

  // logica baseada no seguinte repositorio https://github.com/tryber/sd-012-project-trivia-react-redux/pull/8/commits/a93062a005d249fcc708168294a7926669bbf914

  renderQuestions() {
    const { triviaQuest } = this.props;
    const { count, disabled/* , questionNumber  */ } = this.state;
    return (
      <div>
        <p data-testid="question-category">
          Categoria:
          { triviaQuest[0].category }
        </p>
        <p data-testid="question-text">
          { triviaQuest[0].question }
        </p>
        <button
          id="correct"
          type="button"
          data-testid="correct-answer"
          name="correct"
          value={ triviaQuest[0].difficulty }
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          { triviaQuest[0].correct_answer }
        </button>
        {
          triviaQuest[0].incorrect_answers.map((key, index) => (
            <button
              id="incorrect"
              type="button"
              data-testid={ `wrong-answer-${index}` }
              name="incorrect"
              value={ triviaQuest[0].difficulty }
              disabled={ disabled }
              onClick={ this.handleClick }
              key={ key }
            >
              { key }
            </button>
          ))
        }
        <h3>
          Tempo:
          { count }
        </h3>
      </div>
    );
  }

  render() {
    const { triviaQuest } = this.props;
    const firstQuestion = triviaQuest[0];
    // const { questionNumber } = this.state;
    // const firstQuestion = triviaQuest[questionNumber];
    if (triviaQuestion[questionNumber] === undefined) {
      // this.storeInTheRanking();
      return <Redirect to="/feedback" />;
    }
    console.log(firstQuestion);
    return (
      <div>
        <Header />
        <section>
          { firstQuestion ? this.renderQuestions() : <p>LOADING</p> }
          {/* <button
            type="button"
            data-testid="btn-next"
            id="btn-next"
            onClick={ this.handleClickNextButton }
          >
            Next
          </button> */}

          <NextButton />

        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuest: state.questions.questions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  triviaQuest: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
