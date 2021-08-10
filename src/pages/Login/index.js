import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../trivia.png';

// Componentes estilizados;
import LoginFormS from './styles';

// Iportando action "getInfo"
import getInfo from '../../Redux/reducers/player/actions/getEmail';
import InputSection from './InputSection';
import ButtonSection from './ButtonSection';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
      redirectConfig: false,
    };
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSendUserInfo = this.handleSendUserInfo.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleRedirectConfig = this.handleRedirectConfig.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleRedirectConfig() {
    this.setState({ redirectConfig: true });
  }

  // Link do regex = https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  isValid() {
    const { name, email } = this.state;
    const validEmail = /\S+@\S+\.\S+/;
    if (!name || !email) return true;
    // Validação correta do Regex deve retornar false para "disabled={ false }";
    return !validEmail.test(email);
  }

  handleSendUserInfo() {
    const { name, email } = this.state;
    // Recebendo action passada pelo mapDispatchToProps();
    const { getInfoAction } = this.props;
    // Passando email do estado no parâmetro da action;
    getInfoAction({ name, email });
  }

  async handleFetch() {
    const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await fetchAPI.json();
    localStorage.setItem('token', token);
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, redirect, redirectConfig } = this.state;
    return (
      <div className="App">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <main>
          <LoginFormS>
            <InputSection
              name={ name }
              email={ email }
              handleChange={ this.handleChange }
            />
            <ButtonSection
              isValid={ this.isValid }
              handleFetch={ this.handleFetch }
              handleSendUserInfo={ this.handleSendUserInfo }
              handleRedirectConfig={ this.handleRedirectConfig }
            />
            { redirect && <Redirect to="/game" /> }
            { redirectConfig && <Redirect to="/config" /> }
          </LoginFormS>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  getInfoAction: PropTypes.func.isRequired,
};

// Enviando action "getEmail" para via props, com o nome "getEmailAction";
const mapDispatchToProps = (dispatch) => ({
  getInfoAction: (info) => dispatch(getInfo(info)),
});

export default connect(null, mapDispatchToProps)(Login);
