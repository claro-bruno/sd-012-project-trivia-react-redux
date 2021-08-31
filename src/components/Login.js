import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveUser, fetchQuestions } from '../actions';
import { fetchToken } from '../services/api';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async setToken() {
    const token = await fetchToken();
    localStorage.setItem('token', token);
    this.setQuestions();
  }

  setUser() {
    const { dispatchUser } = this.props;
    const { email, name } = this.state;

    dispatchUser({ email, name });
  }

  setQuestions() {
    const { dispatchQuestions } = this.props;
    const token = localStorage.getItem('token');

    dispatchQuestions(token);
  }

  handleSubmit() {
    this.setToken();
    this.setUser();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.isFormValid());
  }

  isFormValid() {
    const { email, name } = this.state;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.setState({
      isDisabled: !(name.length > 0 && emailPattern.test(email)),
    });
  }

  render() {
    const { email, name, isDisabled } = this.state;

    return (
      <form>
        <label htmlFor="email">
          Email do Gravatar:
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name">
          Nome do jogador:
          <input
            id="name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Nome"
            data-testid="input-player-name"
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
            data-testid="btn-play"
          >
            JOGAR!
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (player) => dispatch(saveUser(player)),
  dispatchQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchUser: PropTypes.func,
  dispatchQuestions: PropTypes.func,
}.isRequired;
