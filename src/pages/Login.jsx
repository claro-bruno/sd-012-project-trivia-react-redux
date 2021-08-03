import React, { Component } from 'react';
import logo from '../trivia.png';
import Input from '../components/Input';
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      game: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }
  
  handlePlay() {
    const { game } = this.state;
    this.setState((state) => ({
      ...state,
      game = true,
    }))
  }

  buttonDisable() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) return false;
    return true;
  }

  render() {
    const { game } = this.state;
    if(game) {
      return <Redirect to="/game" />
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
            />
            <Input
              id="email"
              name="email"
              type="email"
              testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.buttonDisable() }
            >
              Jogar
            </button>
          </p>
        </header>
      </div>
    );
  }
}

export default Login;
