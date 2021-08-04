import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Loading from '../components/Loading';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      criptoEmail: '',
      imgGravatar: '',
      points: 0,
      nameLogin: '',
      asserts: 0,
      trivias: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchQuestionsAndAnswers();
    this.emailCript();
  }

  componentDidUpdate() {
    this.gravatar();
  }

  // Funcao que é ativada após a att do componente, ela que faz o card da Trivia.
  makeTrivias() {
    const { trivias } = this.state;
    return (
      <>
        <h1 data-testid="question-category">
          { trivias[0].category }
        </h1>
        <h2 data-testid="question-text">
          { trivias[0].question }
        </h2>
        <button data-testid="correct-answer" type="button">
          { trivias[0].correct_answer }
        </button>
        { trivias[0].incorrect_answers.map((wrongAnswer, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ wrongAnswer }
            type="button"
          >
            { wrongAnswer }
          </button>
        )) }
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
    const { emailUser, nameUser } = this.props;
    const stringEmail = md5(emailUser).toString();
    // console.log(stringEmail);
    this.setState({
      criptoEmail: stringEmail,
      nameLogin: nameUser,
    });
  }

  // função para pegar a imagem na api do gravatar
  async gravatar() {
    const { criptoEmail, points, nameLogin, asserts } = this.state;
    // console.log(criptoEmail);
    const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${criptoEmail}`);
    // console.log(fetchGravatar);
    this.setState({
      imgGravatar: fetchGravatar.url,
    });
    localStorage.setItem('player', JSON.stringify({
      gravatarEmail: criptoEmail,
      score: points,
      name: nameLogin,
      assertions: asserts,
    }));
  }

  render() {
    const { loading, points, imgGravatar } = this.state;
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
          <p data-testid="header-score">{ points }</p>
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
