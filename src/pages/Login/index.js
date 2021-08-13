import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../trivia.png';
import mapa from '../../assets/images/mapa.png';

// Componentes estilizados;
import {
  LoginPageS,
  LoginHeaderS,
  LoginMainS,
  LoginFormS,
} from './styles';

// Iportando action "getInfo"
import getInfo from '../../Redux/reducers/player/actions/getEmail';
import InputSection from './InputSection';
import ButtonSection from './ButtonSection';
import fetchCategories from '../../Redux/reducers/questions/actions/fetchCategories';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.pName,
      email: props.pEmail,
      redirect: false,
      redirectConfig: false,
    };
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleRedirectConfig = this.handleRedirectConfig.bind(this);
  }

  componentDidMount() {
    const { requestCategories } = this.props;
    requestCategories();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleRedirectConfig() {
    const { name, email } = this.state;
    const { getInfoAction } = this.props;
    getInfoAction({ name, email });
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

  handleSubmit() {
    const { name, email } = this.state;
    const { getInfoAction } = this.props;
    getInfoAction({ name, email });
    this.handleFetch();
    this.setState({ redirect: true });
  }

  async handleFetch() {
    const fetching = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await fetching.json();
    localStorage.setItem('token', token);
  }

  render() {
    const { name, email, redirect, redirectConfig } = this.state;
    return (
      <LoginPageS>
        <LoginHeaderS>
          <img alt="efeito" src={ mapa } />
          <h1>PROJECT TRÍVIA REACT REDUX</h1>
        </LoginHeaderS>
        <LoginMainS>
          <img src={ logo } className="App-logo" alt="logo" />
          <LoginFormS>
            <InputSection
              name={ name }
              email={ email }
              handleChange={ this.handleChange }
            />
            <ButtonSection
              isValid={ this.isValid }
              handleSubmit={ this.handleSubmit }
              handleRedirectConfig={ this.handleRedirectConfig }
            />
            { redirect && <Redirect to="/game" /> }
            { redirectConfig && <Redirect to="/config" /> }
          </LoginFormS>
        </LoginMainS>
      </LoginPageS>
    );
  }
}

Login.propTypes = {
  getInfoAction: PropTypes.func.isRequired,
  requestCategories: PropTypes.func.isRequired,
  pName: PropTypes.string.isRequired,
  pEmail: PropTypes.string.isRequired,
};

const mapStateToProps = ({ player }) => ({
  pName: player.name,
  pEmail: player.gravatarEmail,
});

// Enviando action "getEmail" para via props, com o nome "getEmailAction";
const mapDispatchToProps = (dispatch) => ({
  getInfoAction: (info) => dispatch(getInfo(info)),
  requestCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
