import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import Input from '../components/Input';
import ADD_NEW_PLAYER from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
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

  buttonDisable() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) return false;
    return true;
  }

  render() {
    const { newUser } = this.props;
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
