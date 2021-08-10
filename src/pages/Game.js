import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js';
import { getQuestions } from '../services/api';
import ButtonNextQuestion from '../components/ButtonNextQuestion';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      disableButton: false,
      answered: false,
      timer: 30,
    };

    this.getQuestions1 = this.getQuestions1.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions1();
  }

  async getQuestions1() {
    const results = await getQuestions();

    this.setState({ questions: results });
    return results;
  }

  buttonEnable(bool) {
    this.setState({
      disableButton: bool,
    });
  }

  // handleInplementButton() {
  //   this.setState((previusState) => ({
  //     index: previusState.index + 1,
  //   }));
  //   this.buttonEnable(true);
  //   // implementar no borda o buttonEnable como false
  //   // após o requisito 6 e 7 - implementar o reset da borda aqui;
  // }

  renderQuestions() {
    const { questions, timer, answered } = this.state;
    const questionFilter = questions.filter((category) => questions
      .indexOf(category) === 0);

    return (
      questionFilter.map((quest, index) => (
        <div key={ index } className="questions">
          <Timer
            timer={ timer }
            answered={ answered }
          />
          <h3 data-testid="question-category">{quest.category}</h3>
          <p data-testid="question-text">{quest.question}</p>
          <button
            type="button"
            data-testid="correct-answer"
            className="correct-answer-btn"
            id="correct-btn"
            onClick={ () => this.setState({ answered: true }) }
          >
            {quest.correct_answer}
          </button>
          {quest.incorrect_answers.map((wrong, index1) => (
            <button
              data-testid={ `wrong-answer-${index1}` }
              key={ index1 }
              type="button"
              className="incorrect-answer-btn"
              onClick={ () => this.setState({ answered: true }) }
            >
              {wrong}
            </button>
          ))}
        </div>
      ))
    );
  }

  render() {
    const { name, gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const getImg = `https://www.gravatar.com/avatar/${hash}`;
    const { /* index */ disableButton, answered } = this.state;
    // o index acima, implementar após a lógica das respostas corretas
    // para mudar de acordo com o numero da questão;

    // https://github.com/tryber/sd-010-a-project-trivia-react-redux/pull/600/
    // commits/6c6c13f6c3fdfb09f19cf9f33f6e8cd814b7bd04

    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ getImg } alt="user avatar" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">0</p>
        </header>
        {this.renderQuestions()}
        <ButtonNextQuestion
          disableButton={ disableButton }
          answered={ answered }
          /*  buttonEnable={ this.buttonEnable } */
          // colocar o buttonEnable após o return da modificação das bordas tanto para resetar
          // a borda, quanto para habilitar o botao para pergunta seguinte.
        />
        <Link to="/feedback">
          <button data-testid="feedbackButton" type="button">Feedback</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.player.name,
  gravatarEmail: state.login.player.gravatarEmail,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
};

Game.defaultProps = {
  name: '',
  gravatarEmail: '',
};
