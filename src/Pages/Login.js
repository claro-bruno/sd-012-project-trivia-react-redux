import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLoginAction } from '../redux/actions';
import ConfigButton from '../Components/ConfigButton';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      name: '',
      gravatarEmail: '',
      assertions: 0,
      score: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  setLocalStorage() {
    const { assertions, score, name, gravatarEmail } = this.state;
    const jogador = JSON.stringify({ player: {
      name,
      gravatarEmail,
      assertions,
      score,
    } });
    localStorage.setItem('state', jogador);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick(nome, email) {
    const { sendAction } = this.props;
    sendAction(nome, email);
    this.setLocalStorage();
  }

  render() {
    const { nome, email } = this.state;
    const { history: { push } } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <label htmlFor="input-name">
            Insira seu nome
            <input
              type="text"
              name="nome"
              value={ nome }
              id="input-name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email">
            Insira seu e-mail
            <input
              type="email"
              name="email"
              value={ email }
              id="input-email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !nome || !email }
              onClick={ () => this.handleClick(nome, email) }
            >
              Jogar
            </button>
          </Link>
        </form>
        <ConfigButton push={ push } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf().isRequired, //  precisa arrumar essa props
  sendAction: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired, //  precisa arrumar essa props
};

const mapDispatchToProps = (dispatch) => ({
  sendAction: (nome, email) => dispatch(fetchLoginAction(nome, email)),
});

export default connect(null, mapDispatchToProps)(Login);
