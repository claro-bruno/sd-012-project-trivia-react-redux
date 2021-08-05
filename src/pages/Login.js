import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import { addLoginAction } from '../redux/actions';
import Button from '../components/Button';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    const {
      state: { user, email },
      props: { setLoginStore },
    } = this;
    const login = { user, email };
    setLoginStore(login);
    this.setState({
      user: '',
      email: '',
    });
  }

  render() {
    const {
      handleChange,
      handleSubmit,
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
            name="Entrar"
            disabled={ !(user.length > MAX_LENGTH && email.includes('@' && '.com')) }
            btnAction="oi"
          />
          <Link to="/config">
            <Button
              testId="btn-settings"
              name="Configurações"
              btnAction={ handleSubmit }
            />
          </Link>
        </form>
      </>
    );
  }
}

const {
  func,
} = PropTypes;

Login.propTypes = {
  setLoginStore: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setLoginStore: (login) => dispatch(addLoginAction(login)),
});

export default connect(null, mapDispatchToProps)(Login);
