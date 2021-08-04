import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import UserInputs from '../components/UserInputs';
import GenericBtn from '../components/GenericBtn';
import { playerInfo } from '../redux/actions';
import { requestToken } from '../services';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.validation = this.validation.bind(this);
    this.gameOn = this.gameOn.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.checkLogin);
  }

  handleClick({ target }) {
    const { history } = this.props;
    const { name } = target;
    if (name === 'game') {
      this.gameOn();
    }
    history.push(`/${name}`);
  }

  validation() {
    const { username, email } = this.state;
    return username.length > 0 && email.length > 0;
  }

  checkLogin() {
    this.setState({
      disabled: !(this.validation()),
    });
  }

  async gameOn() {
    const { username, email } = this.state;
    const { play } = this.props;
    const token = await requestToken();
    const hash = md5(email).toString();
    console.log(hash);
    const avatar = `https://www.gravatar.com/avatar/${hash}`;
    const user = {
      name: username,
      email,
      avatar,
    };
    localStorage.setItem('token', token);
    play(user);
  }

  render() {
    const { disabled } = this.state;

    const userInputProps = {
      id: 'input-player-name',
      name: 'username',
      innerHtml: 'Nome',
      type: 'text',
      onChange: this.handleChange,
    };

    const emailInputProps = {
      id: 'input-gravatar-email',
      name: 'email',
      innerHtml: 'Email',
      type: 'email',
      onChange: this.handleChange,
    };

    const loginBtnProps = {
      id: 'btn-play',
      name: 'game',
      value: 'Jogar',
      disabled,
      onClick: this.handleClick,
    };

    const settingsBtnProps = {
      id: 'btn-settings',
      name: 'settings',
      value: 'Configurações',
      onClick: this.handleClick,
    };

    return (
      <div className="App">
        <header className="main-header">
          <h1 className="logo">BRAINTEST</h1>
        </header>
        <div>
          <UserInputs { ...userInputProps } />
          <UserInputs { ...emailInputProps } />
          <GenericBtn { ...loginBtnProps } />
          <GenericBtn { ...settingsBtnProps } />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  play: (user) => dispatch(playerInfo(user)),
});

export default connect(null, mapDispatchToProps)(Login);
