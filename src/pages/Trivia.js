import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      trivias: '',
      loading: true,
      indexQuestion: 0,
      activeButton: true,
      disabled: false,
      time: 30,
    };

    this.questionTimer = this.questionTimer.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
    this.emailCript();
    this.questionTimer();
  }

  componentDidUpdate() {
    this.gravatar();
  }

  // Funcao que ativa o botao de Proxima pergunta, o botao eh ativado independente da resposta ser errada ou certa
  activeButtonNext() {
    const { activeButton } = this.state;

    if (activeButton) {
      return true;
    }
    return false;
  }

  redirectToFeedback() {
    return (
      <Link to="/feedback">
        Próxima
      </Link>
    );
  }

  // Funcao que altera o estado indexQuestion, fazendo assim com que as perguntas mudem. Essa funcao eh chamada apos o clique em qualquer um dos botoes de resposta.
  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
      activeButton: true,
      disabled: false,
      time: 30,
    });
    const correctAnswer = document.querySelector('.button-correct');
    correctAnswer.classList.remove('green-button');
  }

  // REQUISITO 7 - FUNÇÃO PARA ALTERAR A COR DAS ALTERNATIVAS
  changeColorAnswer() {
    const correctAnswer = document.querySelector('.button-correct');
    const incorrectAnswers = document.querySelectorAll('.button-incorrect');
    correctAnswer.classList.add('green-button');
    incorrectAnswers.forEach((question) => question.classList.add('red-button'));
    this.activeButtonNext();
  }

  // Funcao que conta 30 segundos para responder a pergunta
  questionTimer() {
    const plus = 1000;
    const questionTimer = setInterval(() => {
      const { time } = this.state;
      this.setState({
        time: time - 1,
      });
      if (time <= 0) {
        clearInterval(questionTimer);
        this.setState({
          disabled: true,
          time: 'Tempo Esgostado',
          activeButton: false,
        });
      }
    }, plus);
  }

  // Funcao que é ativada após a att do componente, ela que faz o card da Trivia. Ela eh chamada apos o clique no botao Proxima
  makeTrivias() {
    const { trivias, indexQuestion, activeButton, disabled, time } = this.state;
    const questionsLimit = 4;
    return (
      <>
        <span id="timer">{ time }</span>
        <h1 data-testid="question-category">{ trivias[indexQuestion].category }</h1>
        <h2 data-testid="question-text">
          { trivias[indexQuestion].question }
        </h2>
        <button
          data-testid="correct-answer"
          className="button-correct"
          type="button"
          onClick={
            () => (this.setState({ activeButton: false },
              () => this.changeColorAnswer()))
          }
          disabled={ disabled }
        >
          { trivias[indexQuestion].correct_answer }
        </button>
        { trivias[indexQuestion].incorrect_answers.map((wrongAnswer, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            className="button-incorrect"
            key={ wrongAnswer }
            onClick={
              () => (this.setState({ activeButton: false },
                () => this.changeColorAnswer()))
            }
            disabled={ disabled }
          >
            { wrongAnswer }
          </button>
        )) }
        <button
          className={ activeButton ? 'nextButton' : '' }
          disabled={ this.activeButtonNext() }
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextQuestion() }
        >
          { indexQuestion === questionsLimit ? this.redirectToFeedback() : 'Próxima' }
        </button>
      </>
    );
  }

  async tokenRequire() {
    const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchAPI.json();
    const { token } = response;
    localStorage.setItem('token', JSON.stringify(token));

    this.fetchQuestionsAndAnswers();
  }

  // Faz requisicao para API e guarda chave Results no estado da pagina.
  async fetchQuestionsAndAnswers() {
    let token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      await this.tokenRequire();
      token = JSON.parse(localStorage.getItem('token'));
    }

    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const fetchAPI = await fetch(url);
    const response = await fetchAPI.json();
    const { results } = response;

    this.setState({
      trivias: results,
      loading: false,
      criptoEmail: '',
      imgGravatar: '',
    });

    this.emailCript = this.emailCript.bind(this);
    this.gravatar = this.gravatar.bind(this);
  }

  // criptografia do email para a api gravatar
  emailCript() {
    const { emailUser } = this.props;
    const stringEmail = md5(emailUser).toString();
    this.setState({
      criptoEmail: stringEmail,
    });
  }

  // função para pegar a imagem na api do gravatar
  async gravatar() {
    const { criptoEmail } = this.state;
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${criptoEmail}`);
    this.setState({
      imgGravatar: fetchGravatar.url,
    });
  }

  render() {
    const { loading, imgGravatar } = this.state;
    const { nameUser } = this.props;

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <header>
          <img
            alt="imagem jogador"
            data-testid="header-profile-picture"
            src={ imgGravatar }
          />
          <p data-testid="header-player-name">{ nameUser }</p>
          <p data-testid="header-score"> Pontuação: 0</p>
        </header>
        {/* Funcao do console log infinito */}
        { this.makeTrivias() }
      </div>);
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.user.name,
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Trivia);

Trivia.propTypes = {
  nameUser: PropTypes.string,
  emailUser: PropTypes.string,
}.isRequired;
