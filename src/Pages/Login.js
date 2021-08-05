import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLoginAction } from '../redux/actions';
import ConfigButton from '../components/ConfigButton';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick(nome, email) {
    const { history: { push }, sendAction } = this.props;
    sendAction(nome, email);
    push('/game');
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
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !nome || !email }
            onClick={ () => this.handleClick(nome, email) }
          >
            Jogar
          </button>

        </form>
        <ConfigButton push={ push } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.arrayOf().isRequired,
  sendAction: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendAction: (nome, email) => dispatch(fetchLoginAction(nome, email)),
});

export default connect(null, mapDispatchToProps)(Login);
