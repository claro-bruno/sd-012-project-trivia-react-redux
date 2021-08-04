import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      email: '',
      login: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, type, value, checked } }) {
    function newValue() {
      switch (type) {
      case 'checkbox': return checked;
      case 'number': return +value;
      default: return value;
      }
    }
    this.setState((state) => ({ ...state, [name]: newValue() }));
  }

  render() {
    const {
      handleChange,
      state: {
        user,
        email,
      },
    } = this;
    const MAX_LENGTH = 5;
    return (
      <>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <Input
            name="user"
            testId="input-player-name"
            label="Usuário"
            onChange={ handleChange }
            value={ user }
            type="text"
          />
          <Input
            name="email"
            testId="input-gravatar-email"
            label="E-mail"
            onChange={ handleChange }
            value={ email }
            type="email"
          />
          <Button
            testId="btn-play"
            disabled={ !(user.length > MAX_LENGTH && email.includes('@' && '.com')) }
          />
        </form>
      </>
    );
  }
}

export default Login;
