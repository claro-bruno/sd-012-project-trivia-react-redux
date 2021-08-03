import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nome: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, nome } = this.state;

    const inputEmailProps = {
      type: 'text',
      name: 'email',
      id: 'emailInput',
      value: email,
      onChange: this.handleChange,
      labelTxt: 'Email',
    };
    const inputNameProps = {
      type: 'text',
      name: 'nome',
      id: 'nameInput',
      value: nome,
      onChange: this.handleChange,
      labelTxt: 'Nome',
    };
    const buttonProps = {
      onClick: '',
      disabled: !(nome.length > 0 && email.length > 0),
      buttonTxt: 'Jogar',
    };

    return (
      <form>
        <Input { ...inputNameProps } testId="input-player-name" />
        <Input { ...inputEmailProps } testId="input-gravatar-email" />
        <Link to="/game">
          <SubmitButton { ...buttonProps } testId="btn-play" />
        </Link>
      </form>
    );
  }
}
