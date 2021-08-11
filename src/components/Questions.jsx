import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchAPIQuestion } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      idQuestion: 0,
      isAnswered: false,
      time: 30,
      result: 0,
      shouldRedirect: false,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };

    this.findQuestion = this.findQuestion.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.pointsCal = this.pointsCal.bind(this);
    this.setLocalPlayer = this.setLocalPlayer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const thousand = 1000;
    this.findQuestion();
    setInterval(() => this.updateTime(), thousand);
    // this.setLocalPlayer();
  }

  setLocalPlayer() {
    const { player: jogador } = this.state;
    localStorage.setItem('state', JSON.stringify({ player: jogador }));
  }

  async findQuestion() {
    const { getQuestions } = this.props;
    const tokenApi = localStorage.getItem('token');
    const response = await getQuestions(tokenApi);
    const playerX = localStorage.getItem('state');
    const { name, gravatarEmail } = JSON.parse(playerX).player;
    console.log(name);
    console.log(gravatarEmail);
    console.log(JSON.parse(playerX));
    this.setState({
      player: {
        assertions: 0,
        score: 0,
        name,
        gravatarEmail },
    });
    return response;
  }

  pointsCal(correct) {
    const { time, idQuestion } = this.state;
    const { questions: { results } } = this.props;
    const { difficulty } = results[idQuestion];
    const ten = 10;
    let result = 0;
    if (correct === 'true') {
      switch (difficulty) {
      case 'easy':
        result = ten + (time * 1);
        break;
      case 'medium':
        result = ten + (time * 2);
        break;
      case 'hard':
        result = ten + (time * Number('3'));
        break;
      default:
        console.log('erro no switch');
      }
      this.setState((prevState) => ({
        player: {
          ...prevState.player,
          assertions: prevState.player.assertions + 1,
        },
      }));
    }
    return result;
  }

  nextQuestion() {
    const four = 4;
    const { idQuestion } = this.state;
    if (idQuestion === four) {
      this.setState({
        shouldRedirect: true,
      });
    }
    this.setState((prevState) => ({
      idQuestion: prevState.idQuestion + 1,
      isAnswered: false,
      time: 30,
    }));
  }

  handleClick(correct) {
    const resultado = this.pointsCal(correct);
    this.setState((prevState) => ({
      isAnswered: true,
      time: 0,
      result: prevState.result + resultado,
      player: {
        ...prevState.player,
        score: prevState.result + resultado,
        assertions: prevState.player.assertions,
      },
    }), () => {
      console.log(this.state);
      this.setLocalPlayer();
    });
  }

  updateTime() {
    const { time } = this.state;
    if (time > 0) {
      this.setState((state) => ({
        time: state.time - 1,
      }));
    } else {
      this.setState({
        isAnswered: true,
      });
    }
  }

  renderQuestion() {
    const { idQuestion, isAnswered } = this.state;
    const { questions: { results } } = this.props;
    const styleWrong = { border: '3px solid rgb(255, 0, 0)' };
    const styleCorrect = { border: '3px solid rgb(6, 240, 15)' };
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
      type } = results[idQuestion];
    return (
      <div className="d-flex flex-column">
        <h4 data-testid="question-category">{ category }</h4>
        <h3 data-testid="question-text">{ question }</h3>
        {
          type === 'boolean'
            ? (
              <button
                data-testid="wrong-answer-0"
                type="button"
                disabled={ isAnswered }
                style={ isAnswered ? styleWrong : null }
                onClick={ this.handleClick }
              >
                { incorrectAnswer }
              </button>)
            : incorrectAnswer.map((answer, index) => (
              <button
                data-testid={ `wrong-answer-${index}` }
                key={ index }
                type="button"
                value={ answer }
                disabled={ isAnswered }
                style={ isAnswered ? styleWrong : null }
                onClick={ this.handleClick }
              >
                { answer }
              </button>
            ))
        }
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ isAnswered }
          style={ isAnswered ? styleCorrect : null }
          onClick={ () => this.handleClick('true') }
        >
          { correctAnswer }
        </button>
      </div>
    );
  }

  render() {
    const { isAnswered, time, shouldRedirect } = this.state;
    const { questions } = this.props;
    const { results } = questions;

    if (shouldRedirect) return <Redirect to="/feedback" />;
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="questions">
          {
            results ? this.renderQuestion() : null
          }
        </div>
        <div className="timer">
          {`Tempo: ${time}`}
        </div>
        <button
          type="button"
          className="button-next btn btn-primary"
          data-testid="btn-next"
          style={ !isAnswered ? { display: 'none' } : null }
          onClick={ this.nextQuestion }
        >
          Pŕoxima
        </button>
      </div>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.shape({
      category: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      correct_answer: PropTypes.string.isRequired,
      incorrect_answers: PropTypes.objectOf(PropTypes.string),
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (questions) => dispatch(fetchAPIQuestion(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
