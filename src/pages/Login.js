import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { fetchCategories, fetchQuestions, getPlayerInfo } from '../redux/actions';
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
    const { getCategories, getPlayer, getQuestions, category, difficulty,
      type } = this.props;
    if (destiny === '/trivia') {
      const { name, email } = this.state;
      if (name === 'Prince Rogers Nelson') {
        /* Source: https://reactgo.com/react-redirect-to-external-url/ */
        window.location.href = 'https://www.youtube.com/watch?v=TvnYmWpD_T8';
        return;
      }
      const picture = URL_GRAVATAR + md5(email).toString();
      const state = JSON.stringify({
        player: { name, assertions: 0, score: 0, gravatarEmail: email } });
      localStorage.setItem('state', state);
      getPlayer({ name, email, picture });
      getQuestions({ category, difficulty, type });
    } else { getCategories(); }
    this.setState({ destiny });
  }

  createInput(inputProperties) {
    const [type, id, value, text, testid, className, func] = inputProperties;
    return (
      <label htmlFor={ id }>
        { text }
        <input
          type={ type }
          id={ id }
          value={ value }
          data-testid={ testid }
          className={ className }
          onChange={ func }
        />
      </label>
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
            {createInput(['text', 'name', name, 'Name:',
              'input-player-name', 'form__field', handleChange])}
            {createInput(['text', 'email', email, 'E-mail:', 'input-gravatar-email',
              'form__field', handleChange])}
            {this.createBtn(['PLAY', 'btn-play', disableBtn, '/trivia', btnClick])}
            {this.createBtn(['SETTINGS', 'btn-settings', false, '/settings',
              btnClick])}
          </div>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
  getPlayer: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ ...state.config });

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchCategories),
  getPlayer: (info) => dispatch(getPlayerInfo(info)),
  getQuestions: (config) => dispatch(fetchQuestions(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
