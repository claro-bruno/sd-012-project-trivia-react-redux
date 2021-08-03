import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import logo from '../trivia.png';
import Input from '../components/Input';
import ADD_NEW_PLAYER from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      config: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onclick(newUser) {
    newUser(this.state);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    this.setState({ config: true });
  }

  buttonDisable() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) return false;
    return true;
  }

  render() {
    const { newUser } = this.props;
    const { config } = this.state;
    if (config) {
      return <Redirect to="/config" />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ!
            <Input
              id="name"
              name="name"
              type="text"
              testid="input-player-name"
              onChange={ this.handleChange }
              placeholder="Nome do jogador"
            />
            <Input
              id="email"
              name="email"
              type="email"
              testid="input-gravatar-email"
              onChange={ this.handleChange }
              placeholder="Email"
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.buttonDisable() }
              onClick={ this.onclick(newUser) }
            >
              Jogar
            </button>
          </p>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newUser: (value) => dispatch(ADD_NEW_PLAYER(value)),
});

Login.propTypes = {
  newUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
