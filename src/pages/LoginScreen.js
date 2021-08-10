import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';
import NameInput from '../components/LoginScreen/NameInput';
import EmailInput from '../components/LoginScreen/EmailInput';
import ButtonPlay from '../components/LoginScreen/ButtonPlay';
import logo from '../trivia.png';
import '../App.css';
import ButtonSettings from '../components/LoginScreen/ButtonSettings';
import { storagePlayerInfo } from '../actions/index';
import fetchToken from '../fetchs/fetchToken';
import saveInfoLocalStorage from '../functions/saveInfoLocalStorage';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndName = this.validateEmailAndName.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  async getToken() {
    const { state } = this;
    const { name, email } = state;
    const { storePlayerInfo, token } = this.props;
    const tokenStringfy = JSON.stringify(token);
    localStorage.setItem('token', tokenStringfy);
    storePlayerInfo(state);
    saveInfoLocalStorage(name, email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateEmailAndName());
  }

  validateEmailAndName() {
    const { email, name } = this.state;
    const re = /\w+@\w+.com/.test(email);
    const minimumNameLength = 2;
    const validName = name.length >= minimumNameLength;
    const logicValidation = re && validName;
    this.setState({
      disabled: !logicValidation,
    });
  }

  render() {
    const { disabled, email, name } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <h1
          className="your-turn"
        >
          Your Turn!
        </h1>
        <NameInput
          onChange={ this.handleChange }
          value={ name }
        />
        <EmailInput
          onChange={ this.handleChange }
          value={ email }
        />
        <div
          className="btns-container"
        >
          <ButtonPlay
            isDisabled={ disabled }
            storeFunc={ this.getToken }
          />
          <ButtonSettings />
        </div>
      </header>
    );
  }
}

LoginScreen.propTypes = {
  storePlayerInfo: func.isRequired,
  getToken: func.isRequired,
  token: string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  storePlayerInfo: (data) => dispatch(storagePlayerInfo(data)),
  getToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
