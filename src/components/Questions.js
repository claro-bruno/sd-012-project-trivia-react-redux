import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import Loading from './Loading';
import '../styles/Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trivias: '',
      loading: true,
      // indexQuestion: 0,
      activeButton: false,
    };

    this.fetchQuestionsAndAnswers = this.fetchQuestionsAndAnswers.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.makeTrivias = this.makeTrivias.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
  }

  // componentDidUpdate() {
  //   this.activeButtonNext();
  // }

  // Faz requisicao para API e guarda chave Results no estado da pagina.
  async fetchQuestionsAndAnswers() {
    const { token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const fetchAPI = await fetch(url);
    const response = await fetchAPI.json();
    const { results } = response;

    this.setState({
      trivias: results,
      loading: false,
    });
  }

  changeColorAnswer() {
    const incorrectAnswers = document.getElementsByName('incorrect');
    const correctAnswer = document.getElementById('correct');

    incorrectAnswers.forEach((question) => {
      question.className = 'red-border';
    });
    correctAnswer.className = 'green-border';
    this.setState({
      activeButton: true,
    });
  }

  activeButtonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }

  // let token = JSON.parse(localStorage.getItem('token'));

  // if (!token) {
  //   await this.tokenRequire();
  //   token = JSON.parse(localStorage.getItem('token'));
  // }

  // Funcao que ativa o botao de Proxima pergunta, o botao eh ativado independente da resposta ser errada ou certa
  // activeButtonNext() {
  //   const { activeButton } = this.state;

  //   if (activeButton) {
  //     return true;
  //   }
  //   return false;
  // }

  // redirectToFeedback() {
  //   return (
  //     <Link to="/feedback">
  //       Próxima
  //     </Link>
  //   );
  // }

  // Funcao que altera o estado indexQuestion, fazendo assim com que as perguntas mudem. Essa funcao eh chamada apos o clique em qualquer um dos botoes de resposta.

  // nextQuestion() {
  //   const { indexQuestion } = this.state;
  //   this.setState({
  //     indexQuestion: indexQuestion + 1,
  //     activeButton: true,
  //   });

  //   const correctAnswer = document.getElementById('correct');
  //   const incorrectAnswers = document.getElementsByName('incorrect');
  //   correctAnswer.className = ('button-correct');
  //   correctAnswer.disable = false;
  //   incorrectAnswers.disable = false;
  // }

  makeTrivias() {
    const { trivias, activeButton } = this.state;
    const { disabled } = this.props;
    // const questionsLimit = 4;
    return (
      <>
        <Timer />
        <h1 data-testid="question-category">{ trivias[0].category }</h1>
        <h2 data-testid="question-text">{ trivias[0].question }</h2>
        <ol>
          <li>
            <button
              id="correct"
              data-testid="correct-answer"
              type="button"
              onClick={ this.changeColorAnswer }
              disabled={ disabled }
            >
              { trivias[0].correct_answer }
            </button>
          </li>
          { trivias[0].incorrect_answers.map(((wrongAnswer, index) => (
            <li key={ index }>
              <button
                name="incorrect"
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.changeColorAnswer }
                disabled={ disabled }
              >
                { wrongAnswer }
              </button>
            </li>
          ))) }
        </ol>
        { activeButton && this.activeButtonNext() }
      </>
    );
  }

  makeTriviasRender() {
    const { loading } = this.state;
    return loading ? <h1>Loading await...</h1> : this.makeTrivias();
  }

  //       <button
  //         className={ activeButton ? 'nextButton' : '' }
  //         disabled={ this.activeButtonNext() }
  //         type="button"
  //         data-testid="btn-next"
  //         onClick={ () => this.nextQuestion() }
  //       >
  //         { indexQuestion === questionsLimit ? this.redirectToFeedback() : 'Próxima' }
  //       </button>
  //   );
  // }

  render() {
    const { load } = this.props;
    return load ? <Loading /> : this.makeTriviasRender();
  }
}

const mapStateToProps = (state) => ({
  timeValue: state.timer.time,
  disableValue: state.timer.disabled,
  load: state.user.load,
  token: state.user.token,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  time: PropTypes.number,
  disabled: PropTypes.bool,
}.isRequired;
