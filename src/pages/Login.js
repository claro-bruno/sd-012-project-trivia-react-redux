import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { fetchQuestions, getPlayerInfo } from '../redux/actions';
import logo from '../img/trivia.png';

const URL_GRAVATAR = 'https://www.gravatar.com/avatar/';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disableBtn: true,
      destiny: null,
    };
    this.btnClick = this.btnClick.bind(this);
    this.btnStats = this.btnStats.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value }, this.btnStats);
  }

  btnStats() {
    const { name, email, disableBtn } = this.state;
    const disable = (name === '') || (email === '');
    if (disableBtn !== disable) this.setState({ disableBtn: disable });
  }

  btnClick(destiny) {
    if (destiny === '/trivia') {
      const { name, email } = this.state;
      const { getPlayer, getQuestions } = this.props;
      const picture = URL_GRAVATAR + md5(email).toString();
      const state = JSON.stringify({
        player: { name, assertions: 0, score: 0, gravatarEmail: email } });
      localStorage.setItem('state', state);
      getPlayer({ name, email, picture });
      getQuestions();
    }
    this.setState({ destiny });
  }

  createInput(inputProperties) {
    const [type, id, value, text, testid, func] = inputProperties;
    return (
      <input
        type={ type }
        id={ id }
        value={ value }
        placeholder={ text }
        data-testid={ testid }
        onChange={ func }
      />
    );
  }

  createBtn(inputProperties) {
    const [text, testid, bool, destiny, func] = inputProperties;
    return (
      <button
        type="button"
        data-testid={ testid }
        className={ testid }
        disabled={ bool }
        onClick={ () => func(destiny) }
      >
        { text }
      </button>
    );
  }

  render() {
    const { createInput, handleChange, btnClick } = this;
    const { name, email, disableBtn, destiny } = this.state;
    return (
      <div className="App">
        { destiny && <Redirect to={ destiny } />}
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div className="loginContainer">
            {createInput(['text', 'name', name, 'NOME:', 'input-player-name',
              handleChange])}
            {createInput(['text', 'email', email, 'E-MAIL:', 'input-gravatar-email',
              handleChange])}
            {this.createBtn(['PLAY', 'btn-play', disableBtn, '/trivia', btnClick])}
            {this.createBtn(['CONFIGURAÇÕES', 'btn-settings', false, '/config',
              btnClick])}
          </div>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  getPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  getPlayer: (info) => dispatch(getPlayerInfo(info)),
});

export default connect(null, mapDispatchToProps)(Login);
